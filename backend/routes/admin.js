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
    getRequest
}
from "../controller/adminController.js";

import {isAdmin} from "../middleware/isAdmin.js";

import {authenticateToken} from "../middleware/authenticate.js";    

adminRoute.post('/create-admin/' , createAdmin);

adminRoute.post('/login/' , adminLogin);

adminRoute.get('/faculty/' , authenticateToken, isAdmin, getFaculties);

adminRoute.get('/faculty/:facultyId' , authenticateToken, isAdmin, getFaculty);

adminRoute.get('/students/' , authenticateToken, isAdmin, getStudents);

adminRoute.get('/student/:studentId' , authenticateToken, isAdmin, getStudent);

adminRoute.get('/requests/' , authenticateToken, isAdmin, getRequests);

adminRoute.get('/request/:requestId' , authenticateToken, isAdmin, getRequest);

adminRoute.get('/pending-requests/' , authenticateToken, isAdmin, getPendingRequests);



adminRoute.get('/test/' , async (req, res) =>{
   return  res.send({"msg" : "admin test route working"});
})


export default adminRoute;
