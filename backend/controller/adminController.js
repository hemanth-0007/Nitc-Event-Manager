import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Comment from "../models/Comment.js";
import Request from "../models/Request.js";
import Admin from "../models/Admin.js";


import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


import { StatusType } from '../Enums/StatusType.js';
import { RequestType } from '../Enums/RequestType.js';
import {LocationArray, Places} from '../Enums/Location.js';
import { Role } from '../Enums/role.js';


export const getFaculties = async (req, res) => {
    try {
        const faculty = await Faculty.find({});
        res.status(200).json(faculty);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFaculty = async (req, res) => {
 
    const {facultyId} = req.params;
    if(!facultyId){
        return res.status(400).json({ message: 'Faculty id is required' });
    }
    try {
        const faculty = await Faculty.findById(facultyId);
       return res.status(200).send(faculty);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}


export const getStudents = async (req, res) => {
    try {
        const students = await Student.find({}).populate('faculty');
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getStudent = async (req, res) => {
    const {studentId} = req.params;
    if(!studentId){
        return res.status(400).json({ message: 'Student id is required' });
    }
    try {
        const student = await Student.findById(studentId)
        .populate({
            path: 'requests',
            select: 'title',
        })
        .populate({
            path: 'faculty',
            select: 'name email',
        })
        ;
        return res.status(200).send(student);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}


export const getRequests = async (req, res) => {
    try {
         
        const requests = await Request.find({});
        res.status(200).json(requests);
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getRequest = async (req, res) => {
    const {requestId} = req.params;
    if(!requestId){
        return res.status(400).json({ message: 'Request id is required' });
    }
    try {
        const request = await Request.findById(requestId).populate(['student', 'faculty', 'comments']);
        return res.status(200).send(request);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getPendingRequests = async (req, res) => {
    try {
        const requests = await Request.find({status: StatusType.PENDING}).populate(['student', 'faculty', 'comments']);
        res.status(200).json(requests);
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = { id: admin._id, email: admin.email, role: Role.ADMIN };
        // console.log(payload);
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export const createAdmin = async (req, res) =>{
    const {username, password, email} = req.body;
    if(!username || !password || !email){
        return res.status(400).json({ message: 'All fields are required' });
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({username, password : hashedPassword, email});
        const dbAdmin = await newAdmin.save();
        res.status(201).send(dbAdmin);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }

}