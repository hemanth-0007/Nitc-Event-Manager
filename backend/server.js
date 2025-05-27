import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import studentRoute from './routes/student.js';
import facultyRoute from './routes/faculty.js';
import adminRoute from './routes/admin.js';

import http from 'http';
import { Server } from "socket.io";

import { connectDB } from './config/connectDB.js';

 
import jwt from 'jsonwebtoken';
 

// Load the environment variables
dotenv.config();


const app = express();
const port = 5000;


const corsOptions = {
    origin: ["*"], // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

// Middleware
app.use(cors(corsOptions));

// app.options('*', cors(corsOptions)); // Pre-flight request for CORS

// Middleware to parse JSON bodies
app.use(express.json());



// Create a HTTP server
const httpServer = http.createServer(app);
// Create a socket.io instance
const frontendUrl = process.env.FRONTEND_URL;
const io = new Server(httpServer, {
    cors: {
        origin: frontendUrl,
        methods: ['GET', 'POST']
    }
});

// Connect to the mongoDB Atlas through MONGO_URI
const uri = process.env.MONGO_URI; 
console.log("uri is ", uri);
connectDB(uri);

// Socket.io connection
io.on('connection', (socket) => {
    
    const token = socket.handshake.auth.token;
    let userId = null;
    if (token === undefined || token === null || token === ""){
        return new Error("Invalid token");
    }
   
     jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
       if (error) {
           return new Error("Token verification failed");
       } 
       else {
           console.log(payload.id);
           userId = payload.id;
        //    console.log('User connected:', userId);
           if (userId) {
               console.log('User connected:', userId);
               socket.join(userId);
           }
       }
    });
    
 

    socket.on('disconnect', () => {
        if(userId) {
            socket.leave(userId);
        }
    });
});

// can be accessed in other files using req.app.get('io')
app.set('io', io);






app.get('/', (req, res) => {
    res.send('Server is running!');
});
 
app.use('/api/auth', authRoute);
app.use('/api/student', studentRoute);
app.use('/api/faculty', facultyRoute);
app.use('/api/admin', adminRoute);



httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






