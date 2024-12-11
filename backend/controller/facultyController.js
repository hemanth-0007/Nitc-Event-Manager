import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Comment from "../models/Comment.js";
import Request from "../models/Request.js";

import { StatusType } from "../Enums/StatusType.js";
import { RequestType } from "../Enums/RequestType.js";
import { LocationArray, Places } from "../Enums/Location.js";
import { Role } from "../Enums/role.js";
import { book } from "../utility/book.js";

export const getProfile = async (req, res) => {
  const { id, email } = req;
  try {
    const faculty = await Faculty.findOne({ email });
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
        if(request.status != StatusType.PENDING)
          return res.status(400).json({ message: "Request has been resolved" });
        // check if there are any overlapping requests
        const requests = await Request.find({});
        const events = [];
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].status === StatusType.ACCEPTED && requests[i].category === request.category && requests[i].location === request.location) {
                events.push([requests[i].startTime, requests[i].endTime]);
            }
        }
        if(!book(events, request.startTime, request.endTime))
          return res.status(400).json({ message: "Request overlaps with another request" });
        request.status = StatusType.ACCEPTED;
        await request.save();
        return res.status(200).json({ message: "Request accepted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


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

        if(request.status !== StatusType.PENDING)
          return res.status(400).json({ message: "Request has been resolved" });
        request.status = StatusType.REJECTED;
        await request.save();
        return res.status(200).json({ message: "Request rejected successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


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
}
