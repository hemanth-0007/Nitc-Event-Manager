import express from "express";
const studentRoute = express.Router();

import {
    createRequest,
    getRequests,
    getPendingRequests,
    addComment,
    getProfile,
    getDetailedRequest,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
} 
from "../controller/studentController.js";

import {authenticateToken} from "../middleware/authenticate.js";    


// file upload
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//  post a request
studentRoute.post("/req/" , authenticateToken, upload.single("pdf-file"), createRequest);
// studentRoute.post("/req/" , authenticateToken, upload.single("pdf-file"), createRequest);


studentRoute.get("/req/", authenticateToken, getRequests);

studentRoute.get("/req/pending/", authenticateToken, getPendingRequests);

studentRoute.post("/req/comment/:reqId", authenticateToken, addComment);

studentRoute.get("/profile/", authenticateToken, getProfile);

studentRoute.get("/req/:reqId", authenticateToken, getDetailedRequest);

studentRoute.get('/notifications/', authenticateToken, getNotifications);


studentRoute.post('/notifications/mark-as-read/:notificationId', authenticateToken, markNotificationAsRead);

studentRoute.put('/notifications/mark-as-read/', authenticateToken, markAllNotificationsAsRead);


studentRoute.get('/test/' , async (req, res) =>{
    // const f = await Faculty.findOne({email : "teja@nitc.ac.in"}).populate('students');
    // res.send(f);
    res.send({"msg" : "student route working"});
})


export default studentRoute;
