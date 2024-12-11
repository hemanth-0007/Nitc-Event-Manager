import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Comment from "../models/Comment.js";
import Request from "../models/Request.js";

import { StatusType } from '../Enums/StatusType.js';
import { RequestType } from '../Enums/RequestType.js';
import {LocationArray, Places} from '../Enums/Location.js';
import { Role } from '../Enums/role.js';


export const getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find({}).populate('students');
        res.status(200).json(faculty);
    } catch (error) {
        res.status(404).json({ message: error.message });
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


export const getRequests = async (req, res) => {
    try {
        const requests = await Request.find({}).populate(['student', 'faculty', 'comments']);
        res.status(200).json(requests);
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
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





