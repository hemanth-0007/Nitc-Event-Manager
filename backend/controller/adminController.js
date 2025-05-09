import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Comment from "../models/Comment.js";
import Request from "../models/Request.js";
import Admin from "../models/Admin.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { StatusType } from "../Enums/StatusType.js";
import { RequestType } from "../Enums/RequestType.js";
import { LocationArray, Places } from "../Enums/Location.js";
import { Role } from "../Enums/role.js";
import { Mongoose, mongoose } from "mongoose";

export const getFaculties = async (req, res) => {
  try {
    const faculty = await Faculty.find({});
    res.status(200).json(faculty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFacultyByNames = async (req, res) => {
  try {
    const faculty = await Faculty.find({}).select("name");
    return res.status(200).json(faculty);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getFaculty = async (req, res) => {
  const { facultyId } = req.params;
  if (!facultyId) {
    return res.status(400).json({ message: "Faculty id is required" });
  }
  try {
    const faculty = await Faculty.findById(facultyId);
    return res.status(200).send(faculty);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({}).populate("faculty");
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) {
    return res.status(400).json({ message: "Student id is required" });
  }
  try {
    const student = await Student.findById(studentId)
      .populate({
        path: "requests",
        select: "title",
      })
      .populate({
        path: "faculty",
        select: "name email",
      });
    return res.status(200).send(student);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({});
    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRequest = async (req, res) => {
  const { requestId } = req.params;
  if (!requestId) {
    return res.status(400).json({ message: "Request id is required" });
  }
  try {
    const request = await Request.findById(requestId).populate([
      "student",
      "faculty",
      "comments",
    ]);
    return res.status(200).send(request);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      status: StatusType.PENDING,
    }).populate(["student", "faculty", "comments"]);
    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = { id: admin._id, email: admin.email, role: Role.ADMIN };
    // console.log(payload);
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword, email });
    const dbAdmin = await newAdmin.save();
    res.status(201).send(dbAdmin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const { rollNo, name, email, password, phoneNo, department, facultyId } =
    req.body;
  if (
    !rollNo ||
    !name ||
    !email ||
    !password ||
    !phoneNo ||
    !department ||
    !facultyId
  )
    return res.status(400).json({ message: "All fields are required" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const dbStudent = await Student.findOne({ rollNo, email });
    if (dbStudent) {
      return res
        .status(400)
        .json({ message: "Student already exists with roll Number or Email" });
    }

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(400).json({ message: "Faculty does not exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      rollNo,
      name,
      email,
      password: hashedPassword,
      phoneNo,
      department,
      faculty: facultyId,
    });
    // console.log(newStudent);
    if (newStudent._id) faculty.students.push(newStudent._id);
    else return res.status(400).json({ message: "Student not created" });
    // we can start a transaction here
    await newStudent.save();
    await faculty.save();

    await session.commitTransaction();
    session.endSession();
    return res.status(201).send({ message: "Student created successfully" });
  } 
  catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(404).json({ message: error.message });
  }
};

export const createFaculty = async (req, res) => {
  const { name, email, password, phoneNo, department } = req.body;
  if (!name || !email || !password || !phoneNo)
    return res.status(400).json({ message: "All fields are required" });
  try {
    const dbFaculty = await Faculty.findOne({ email, phoneNo });
    if (dbFaculty) {
      return res
        .status(400)
        .json({ message: "Faculty already exists with email or phone number" });
    }
    const newFaculty = new Faculty({
      name,
      email,
      password,
      phoneNo,
      department,
    });
    await newFaculty.save();
    return res.status(201).send({message : "Faculty created successfully"});
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) {
    return res.status(400).json({ message: "Student id is required" });
  }
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const facultyId = student.faculty;
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res
        .status(404)
        .json({ message: "Faculty for the student not found" });
    }
    const index = faculty.students.indexOf(studentId);
    if (index === -1) {
      return res.status(404).json({ message: "Student not found in faculty" });
    }
    faculty.students.splice(index, 1);
    await Student.deleteOne({ _id: studentId });
    await faculty.save();
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteFaculty = async (req, res) => {
  const { facultyId } = req.params;
  if (!facultyId) {
    return res.status(400).json({ message: "Faculty id is required" });
  }
  try {
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    for (let studentId of faculty.students) {
      if (studentId) {
        const student = await Student.findById(studentId);
        if (student) {
          student.faculty = null;
          await student.save();
        }
      }
    }
    await Faculty.deleteOne({ _id: facultyId });
    return res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const assignStudentToFaculty = async (req, res) => {
  const { studentId } = req.params;
  const { facultyId } = req.body;

  if (!facultyId || !studentId) {
    return res
      .status(400)
      .json({ message: "Faculty id and Student id are required" });
  }
  try {
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    for (let facultyStudentId of faculty.students) {
      if (facultyStudentId === studentId) {
        return res
          .status(400)
          .json({ message: "Student already assigned to this faculty" });
      }
    }
    faculty.students.push(studentId);
    await faculty.save();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


export const assignFacultyToStudent = async (req, res) => {
    const { facultyId } = req.params;
    const { studentId } = req.body;

    if (!facultyId || !studentId) {
        return res
            .status(400)
            .json({ message: "Faculty id and Student id are required" });
    }
    try {
        const faculty = await Faculty.findById(facultyId);
        if(!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        const student = await Student.findById(studentId);
        if(!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        for(let facultyStudentId of faculty.students) {
            if(facultyStudentId === studentId) {
                return res.status(400).json({ message: "Student already assigned to this faculty" });
            }
        }
        faculty.students.push(studentId);
        student.faculty = facultyId;
        await student.save();
        await faculty.save();
    } 
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

