import express from "express";
const adminRoute = express.Router();

import {
    getFaculty,
    getStudents,
    getRequests,
    getPendingRequests,
}
from "../controller/adminController.js";

import {isAdmin} from "../middleware/isAdmin.js";

import {authenticateToken} from "../middleware/authenticate.js";    


adminRoute.get('/faculty/' , authenticateToken, isAdmin, getFaculty);

adminRoute.get('/students/' , authenticateToken, isAdmin, getStudents);

adminRoute.get('/requests/' , authenticateToken, isAdmin, getRequests);


adminRoute.get('/pendingRequests/' , authenticateToken, isAdmin, getPendingRequests);





 

adminRoute.get('/test/' , async (req, res) =>{
 
    res.send({"msg" : "admin test route working"});
})


export default adminRoute;
