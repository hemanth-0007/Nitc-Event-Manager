
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



 
export const studentRegister = async (req, res) => {
    const { name, rollNo, phoneNo, email, password } = req.body;

    if (!name || !rollNo || !phoneNo || !email || !password)  
        return res.status(400).json({ message: 'All fields are required' });

    const dbStudent = await Student.findOne({ rollNo });

    if(dbStudent) 
        return res.status(400).json({ message: 'Student already exists' });
     
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const student = await Student.create({
            name,
            email,
            password : hashedPassword,
            rollNo,
            phoneNo
        });
        return res.status(201).json({ student });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const studentLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) 
        return res.status(400).json({ message: 'All fields are required' });

    try {
        const student = await Student.findOne({ email });

        if (!student) 
            return res.status(400).json({ message: 'Student does not exist' });
    
        const isMatch = await bcrypt.compare(password, student.password);
    
        if (!isMatch) 
            return res.status(400).json({ message: 'Invalid credentials' });
    
        // ******* This is payload to token ********
        const payload = { id: student._id, email: student.email, role : "student" };
        // ******* This is payload to token ********
    
        const token = jwt.sign(payload, process.env.SECRET_KEY);

        return res.status(200).send({ token });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const facultyRegister = async (req, res) => {
    const {name, phoneNo, email, password} = req.body;

    if(!name || !phoneNo || !email || !password) 
        return res.status(400).json({ message: 'All fields are required' });

    const dbFaculty = await Faculty.findOne({email});

    if(dbFaculty) 
        return res.status(400).json({ message: 'Faculty already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const faculty = await Faculty.create({
            name,
            email,
            password : hashedPassword,
            phoneNo
        });
        return res.status(201).json({ faculty });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const facultyLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) 
        return res.status(400).json({ message: 'All fields are required' });

    try {
        const faculty = await Faculty.findOne({ email });

        if (!faculty) 
            return res.status(400).json({ message: 'Faculty does not exist' });
    
        const isMatch = await bcrypt.compare(password, faculty.password);
    
        if (!isMatch) 
            return res.status(400).json({ message: 'Invalid credentials' });
    
        // ******* This is payload to token ********
        const payload = { id: faculty._id, email: faculty.email, role : "faculty" };
        // ******* This is payload to token ********
    
        const token = jwt.sign(payload, process.env.SECRET_KEY);

        return res.status(200).send({ token });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}