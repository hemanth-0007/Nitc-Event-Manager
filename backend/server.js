import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import studentRoute from './routes/student.js';
import facultyRoute from './routes/faculty.js';
import adminRoute from './routes/admin.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());


// Connect to the database
const uri = process.env.MONGO_URI;
const  connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch (error) {
        console.error(`Error connecting to the database ${error.message}`);
        process.exit(1);
    }
}
// call the connectDB function
connectDB();


app.get('/', (req, res) => {
    res.send('Ok its working');
});

app.use('/api/auth', authRoute);
app.use('/api/student', studentRoute);
app.use('/api/faculty', facultyRoute);
app.use('/api/admin', adminRoute);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});