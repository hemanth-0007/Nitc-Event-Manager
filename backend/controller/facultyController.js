import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Comment from "../models/Comment.js";
import Request from "../models/Request.js";
import Notification from "../models/Notification.js";


import { StatusType } from "../Enums/StatusType.js";

import { Role } from "../Enums/role.js";
import { book } from "../utility/book.js";
import { notificationType } from "../Enums/notificationType.js";

export const getProfile = async (req, res) => {
  const { id, email } = req;
  try {
    const faculty = await Faculty.findOne({ email }).populate("requests");
    if (!faculty)
      return res.status(400).json({ message: "Faculty does not exist" });
    return res.status(200).json(faculty);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
  const { id } = req;
  try {
    const faculty = await Faculty.findById(id).populate("requests");
    if (!faculty)
      return res.status(400).json({ message: "Faculty does not exist" });
    return res.status(200).json(faculty.requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
  const { id } = req;
  try {
    const faculty = await Faculty.findById(id).populate({
      path: "requests",
      match: { status: StatusType.PENDING },
    });
    if (!faculty)
      return res.status(400).json({ message: "Faculty does not exist" });
    return res.status(200).json(faculty.requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const { id } = req;
 
  const { content } = req.body;
  const { reqId } = req.params;
  if (!content)
    return res.status(400).json({ message: "Please fill the comment field" });
  try {
    const faculty = await Faculty.findById(id);
    const request = await Request.findById(reqId);
    if (!faculty || !request)
      return res
        .status(400)
        .json({ message: "Faculty or Request does not exist" });
    const newComment = new Comment({
      sender: Role.FACULTY,
      content,
      faculty: faculty._id,
      student: request.student,
    });
    const dbComment = await newComment.save();
    request.comments.push(dbComment._id);
    await request.save();
    const student = await Student.findById(request.student);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });

    await student.save();

    // send notification to the student with socket.io
    // const io = req.app.get('io');
    // io.to(student._id.toString()).emit('student-recieve-comment',request._id, dbComment);
 
    //use createNotification function to create a notification
    const notification = await createNotification(notificationType.COMMENT, Role.FACULTY, student._id, faculty._id, request._id);

    // send notification to the student with socket.io
    const io = req.app.get('io');
    io.to(student._id.toString()).emit('student-notification-comment',request._id, dbComment, notification);


    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDetailedRequest = async (req, res) => {
  const { id } = req;
  const { reqId } = req.params;
  try {
    const faculty = await Faculty.findById(id);
    if (!faculty)
      return res.status(400).json({ message: "Faculty does not exist" });
    const request = await Request.findById(reqId).populate("comments");
    if (!request)
      return res.status(400).json({ message: "Request does not exist" });
    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  const { id } = req;
  const { reqId } = req.params;
  try {
    const faculty = await Faculty.findById(id);
    const request = await Request.findById(reqId);
    if (!faculty || !request)
      return res
        .status(400)
        .json({ message: "Faculty or Request does not exist" });
    if (request.status != StatusType.PENDING)
      return res.status(400).json({ message: "Request has been resolved" });
    // check if there are any overlapping requests
    const requests = await Request.find({});
    const events = [];
    for (let i = 0; i < requests.length; i++) {
      if (
        requests[i].status === StatusType.ACCEPTED &&
        requests[i].category === request.category &&
        requests[i].location === request.location
      ) {
        events.push([requests[i].startTime, requests[i].endTime]);
      }
    }
    if (!book(events, request.startTime, request.endTime))
      return res
        .status(400)
        .json({ message: "Request overlaps with another request" });
    const student = await Student.findById(request.student);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });

    await student.save();
    request.status = StatusType.ACCEPTED;
    await request.save();

    //use createNotification function to create a notification
    const notification = await createNotification(notificationType.ACCEPT, Role.FACULTY, student._id, faculty._id, request._id);

    // send notification to the student with socket.io
    const io = req.app.get('io');
    io.to(student._id.toString()).emit('recieve-notification', notification);


    return res.status(200).json({ message: "Request accepted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  const { id } = req;
  const { reqId } = req.params;
  try {
    const faculty = await Faculty.findById(id);
    const request = await Request.findById(reqId);
    if (!faculty || !request)
      return res
        .status(400)
        .json({ message: "Faculty or Request does not exist" });

    if (request.status !== StatusType.PENDING)
      return res.status(400).json({ message: "Request has been resolved" });

    const student = await Student.findById(request.student);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });

    await student.save();
    request.status = StatusType.REJECTED;
    await request.save();

    //use createNotification function to create a notification
    const notification = await createNotification(notificationType.REJECT, Role.FACULTY, student._id, faculty._id, request._id);

    // send notification to the student with socket.io
    const io = req.app.get('io');
    io.to(student._id.toString()).emit('recieve-notification', notification);

    return res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  const { id } = req;
  try {
    const faculty = await Faculty.findById(id).populate("students");
    if (!faculty)
      return res.status(400).json({ message: "Faculty does not exist" });
    return res.status(200).json(faculty.students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  const { id } = req;
  const { studentId } = req.params;
  try {
    const faculty = await Faculty.findById(id).populate("students");
    if (!faculty)
      return res.status(400).json({ message: "Faculty does not exist" });

    // check if the student is in the faculty students list
    const isStudentPresent = faculty.students.some(
      (student) => student._id.toString() === studentId
    );

    if (!isStudentPresent)
      return res
        .status(400)
        .json({ message: "can't access this student details" });

    // only populate the title feild of the requests array of the student
    const student = await Student.findById(studentId)
      .populate({
        path: "requests",
        select: "title",
      })
      .populate({
        path: "faculty",
        select: "name email",
      });
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const createNotification = async (type, sender, studentId, facultyId, requestId) =>{
   
  const request = await Request.findById(requestId).select("title");

  let message = "";
  if(type === notificationType.ACCEPT){
    message = `Your request ${request.title} has been accepted`;
  }
  else if(type === notificationType.REJECT){
    message = `Your request ${request.title} has been rejected`;
  }
  else if(type === notificationType.COMMENT){
    message = `Your request ${request.title} has a new comment please check it out!`;
  }

  const newNotification = new Notification({
        sender: sender,
        type: type,
        request: requestId,
        student: studentId,
        faculty: facultyId,
        message: message,
        isRead: false
      });
  const savedNotification =  await newNotification.save();
  if(sender === Role.STUDENT){
    const faculty = await Faculty.findById(facultyId);
    faculty.notifications.push(savedNotification._id);
    await faculty.save();
  }
  if(sender === Role.FACULTY){
    const student = await Student.findById(studentId);
    student.notifications.push(savedNotification._id);
    await student.save();
  }
  
  return savedNotification;
}