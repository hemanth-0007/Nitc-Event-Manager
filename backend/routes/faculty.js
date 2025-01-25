import express from "express";
const facultyRoute = express.Router();

import {
    getProfile,
    getRequests,
    getPendingRequests,
    addComment,
    getDetailedRequest,
    acceptRequest,
    rejectRequest,
    getStudents,
    getStudent
}
from "../controller/facultyController.js";

 
import {authenticateToken} from "../middleware/authenticate.js";    


facultyRoute.get("/profile/", authenticateToken, getProfile);

facultyRoute.get("/req/", authenticateToken, getRequests);

facultyRoute.get('/students/', authenticateToken, getStudents);

facultyRoute.get('/student/:studentId', authenticateToken, getStudent);

facultyRoute.get("/req/pending/", authenticateToken, getPendingRequests);

facultyRoute.post("/req/comment/:reqId", authenticateToken, addComment);

facultyRoute.get("/req/:reqId", authenticateToken, getDetailedRequest);

facultyRoute.post("/req/accept/:reqId", authenticateToken, acceptRequest);

facultyRoute.post("/req/reject/:reqId", authenticateToken, rejectRequest);


 



facultyRoute.get('/test/' , async (req, res) =>{
 
    res.send({"msg" : "faculty route working"});
})


export default facultyRoute;
