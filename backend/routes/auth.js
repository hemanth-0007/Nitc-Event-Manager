import express from "express";
const authRoute = express.Router();

import {
    studentRegister,
    studentLogin,
    facultyRegister,
    facultyLogin
} from "../controller/authController.js";


import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";


authRoute.post("/student/register/", studentRegister);

authRoute.post("/student/login/", studentLogin);

authRoute.post("/faculty/register/", facultyRegister);

authRoute.post("/faculty/login/", facultyLogin);




authRoute.get('/test/' , async (req, res) =>{
    // const f = await Faculty.findOne({email : "teja@nitc.ac.in"}).populate('students');
    // res.send(f);
    res.send({"msg" : "test route working"});
})


export default authRoute;
