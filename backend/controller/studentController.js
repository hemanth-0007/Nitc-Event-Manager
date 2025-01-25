import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Comment from "../models/Comment.js";
import Request from "../models/Request.js";
import Notification from "../models/Notification.js";

import { StatusType } from "../Enums/StatusType.js";
import { RequestType } from "../Enums/RequestType.js";
import { LocationArray, Places } from "../Enums/Location.js";
import { Role } from "../Enums/role.js";

export const createRequest = async (req, res) => {
  // here id we got from the token is the student id , student email
  console.log("create request");

  const { id, email, file } = req;
  if (!req.file)
    return res.status(400).send({ message: "pdf file is null or undefined" });

  const { title, description, category, startTime, endTime, location } =
    req.body;

  if (
    !title ||
    !description ||
    !category ||
    !startTime ||
    !endTime ||
    !location
  )
    return res.status(400).json({ message: "Please fill all the fields" });

  if (category === RequestType.NONE) {
    return res.status(400).json({ message: "Please select a category" });
  }
  if (category === RequestType.BUS && location !== Places.NONE) {
    return res
      .status(400)
      .json({ message: "Location should be NONE for the bus category" });
  }

  if (location !== Places.NONE && !LocationArray.includes(location))
    return res.status(400).json({ message: "Invalid Location" });

  // check if the category key is present in the enum of RequestType
  if (!Object.keys(RequestType).includes(category))
    return res.status(400).json({ message: "Invalid Category" });

  if (startTime > endTime)
    return res
      .status(400)
      .json({ message: "End time should be greater than start time" });

  if (file.mimetype !== "application/pdf")
    return res.status(400).json({ message: "File should be a pdf" });

  if (file.size > 1024 * 1024 * 1)
    return res.status(400).json({ message: "File should be less than 1MB" });

  try {
    const student = await Student.findById(id);
    const faculty = await Faculty.findById(student.faculty);
    if (!student || !faculty)
      return res
        .status(400)
        .json({ message: "Student or Faculty does not exist" });
    const newRequest = new Request({
      title,
      description,
      category,
      startTime,
      endTime,
      location,
      document: file.buffer,
      faculty: faculty._id,
      student: student._id,
    });
    const dbReq = await newRequest.save();
    student.requests.push(dbReq._id);
    await student.save();
    faculty.requests.push(dbReq._id);
    await faculty.save();
    return res.status(200).json({ message: "Request created successfully" });
  } catch (error) {
    console.error(`Error: ${error.stack || error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
  const { id } = req;
  try {
    const student = await Student.findById(id).populate("requests");
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    return res.status(200).json(student.requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
  const { id } = req;
  try {
    const student = await Student.findById(id).populate({
      path: "requests",
      match: { status: StatusType.PENDING },
    });
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    return res.status(200).json(student.requests);
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
    const student = await Student.findById(id);
    const request = await Request.findById(reqId);
    if (!student || !request)
      return res
        .status(400)
        .json({ message: "Student or Request does not exist" });
    const newComment = new Comment({
      sender: Role.STUDENT,
      content,
      student: student._id,
      faculty: student.faculty,
    });

    const dbComment = await newComment.save();

    // access the io object from the app 
    const io = req.app.get('io');
    // emit the event to the faculty room
    io.to(student.faculty.toString()).emit('faculty-recieve-comment',request._id, dbComment);
 
    request.comments.push(dbComment._id);
    await request.save();
    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req;
  try {
    const student = await Student.findById(id).populate("faculty");
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDetailedRequest = async (req, res) => {
  const { id } = req;
  const { reqId } = req.params;
  // console.log(reqId);
  try {
    const student = await Student.findById(id);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    const request = await Request.findById(reqId).populate("comments");
    if (!request)
      return res.status(400).json({ message: "Request does not exist" });
    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  const { id } = req;
  try {
    const student = await Student.findById(id).populate("notifications");
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    return res.status(200).send(student.notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { id } = req;
  const { notificationId } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    const isNotificationPresent = student.notifications.some(
      (notification) => notification.toString() === notificationId
    );
    if (!isNotificationPresent)
      return res.status(400).json({ message: "Notification does not exist" });
    const notification = await Notification.findById(notificationId);
    notification.isRead = true;
    await notification.save();
    return res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  const { id } = req;
  try {
    const student = await Student.findById(id);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    for (let notificationId of student.notifications) {
      const notification = await Notification.findById(notificationId);
      notification.isRead = true;
      await notification.save();
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const unreadCount = async (req, res) => {
  const { id } = req;
  try {
    const student = await Student.findById(id);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    let count = 0;
    for (let notificationId of student.notifications) {
      const notification = await Notification.findById(notificationId);
      if (!notification.isRead) count++;
    }
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
