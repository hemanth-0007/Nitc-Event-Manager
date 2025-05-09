import express from "express";
const adminRoute = express.Router();

import {
    getFaculties,
    getStudents,
    getRequests,
    getPendingRequests,
    createAdmin,
    adminLogin,
    getFaculty,
    getStudent,
    getRequest,
    createStudent,
    createFaculty,
    getFacultyByNames,
    deleteStudent,
    assignStudentToFaculty,
    deleteFaculty,
    assignFacultyToStudent
}
from "../controller/adminController.js";

import {isAdmin} from "../middleware/isAdmin.js";

import {authenticateToken} from "../middleware/authenticate.js";    

adminRoute.post('/create-admin/' , createAdmin);

adminRoute.post('/login/' , adminLogin);

adminRoute.get('/faculty/' , authenticateToken, isAdmin, getFaculties);

adminRoute.get('/faculty-names/' , authenticateToken, isAdmin, getFacultyByNames);

adminRoute.get('/faculty/:facultyId' , authenticateToken, isAdmin, getFaculty);



adminRoute.get('/requests/' , authenticateToken, isAdmin, getRequests);

adminRoute.get('/request/:requestId' , authenticateToken, isAdmin, getRequest);

adminRoute.get('/pending-requests/' , authenticateToken, isAdmin, getPendingRequests);


// admin student api routes

adminRoute.get('/student/all' , authenticateToken, isAdmin, getStudents);

adminRoute.get('/student/:studentId' , authenticateToken, isAdmin, getStudent);

adminRoute.post('/student/' , authenticateToken, isAdmin, createStudent);

adminRoute.delete('/student/:studentId' , authenticateToken, isAdmin, deleteStudent);

// faculyId must be in the body
adminRoute.put('/student/assign/:studentId' , authenticateToken, isAdmin, assignStudentToFaculty);



// admin faculty api routes
adminRoute.post('/faculty/' , authenticateToken, isAdmin, createFaculty);

adminRoute.delete('/faculty/:facultyId' , authenticateToken, isAdmin, deleteFaculty);

// studentId must be in the body
adminRoute.put('/faculty/assign/:facultyId' , authenticateToken, isAdmin, assignFacultyToStudent);


adminRoute.get('/test/' , async (req, res) =>{
   return  res.send({"msg" : "admin test route working"});
})


export default adminRoute;
