import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Role } from "../Enums/role.js";
import { sendMail } from "../config/nodeMailerConf.js";

export const studentRegister = async (req, res) => {
  const { name, rollNo, phoneNo, email, password } = req.body;

  if (!name || !rollNo || !phoneNo || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const dbStudent = await Student.findOne({ rollNo });

  if (dbStudent)
    return res.status(400).json({ message: "Student already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      rollNo,
      phoneNo,
    });
    return res.status(201).json({ student });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const studentLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const student = await Student.findOne({ email });

    if (!student)
      return res.status(400).json({ message: "Student does not exist" });

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // ******* This is payload to token ********
    const payload = {
      id: student._id,
      email: student.email,
      role: Role.STUDENT,
    };
    // ******* This is payload to token ********

    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const facultyRegister = async (req, res) => {
  const { name, phoneNo, email, password, department } = req.body;

  if (!name || !phoneNo || !email || !password || !department)
    return res.status(400).json({ message: "All fields are required" });

  const dbFaculty = await Faculty.findOne({ email });

  if (dbFaculty)
    return res.status(400).json({ message: "Faculty already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const dbFaculty = await Faculty.create({
      name,
      email,
      password: hashedPassword,
      phoneNo,
      department,
    });
    return res.status(201).send(dbFaculty);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const facultyLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const faculty = await Faculty.findOne({ email });

    if (!faculty)
      return res.status(400).json({ message: "Faculty does not exist" });

    const isMatch = await bcrypt.compare(password, faculty.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // ******* This is payload to token ********
    const payload = {
      id: faculty._id,
      email: faculty.email,
      role: Role.FACULTY,
    };
    // ******* This is payload to token ********

    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// TODO : Implement forgot password functionality
// send an otp to the email and save it in the database
export const studentForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || email === null || email === "" || email === undefined) 
        return res.status(400).json({ message: "Email is required" });
    const regex = /^[a-zA-Z0-9._%+-]+@nitc\.ac\.in$/;
    if (regex.test(email) === false) {
        return res.status(400).json({
            message: "Please enter a valid NITC email address to reset your password"
        });
    }
    const student = await Student.findOne({ email });
     
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    student.resetPasswordOTP = otp;
    student.resetPasswordOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    const savedStudent = await student.save();
    // TODO : Send otp to email using nodemailer
    const mailReponse = await sendMail(email, otp);

    if (!mailReponse || !mailReponse.success) {
      return res
        .status(500)
        .json({
          message: mailReponse ? mailReponse.error : "Failed to send OTP",
        });
    }
    // console.log(mailReponse.messageId);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

 
export const studentVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // validate email and otp

    if(!email || email === null || email === "" || email === undefined)
      return res.status(400).json({ message: "Email is required" });

    if(!otp || otp === null || otp === "" || otp === undefined)
      return res.status(400).json({ message: "OTP is required" });

    if(otp.length !== 6)
      return res.status(400).json({ message: "Invalid OTP" });


    // Find user by email
    const student = await Student.findOne({ 
      email, 
      resetPasswordOTP: otp,
      resetPasswordOTPExpiry: { $gt: Date.now() } 
    });
    
    if (!student) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    
    // Generate a reset token for the reset password page
    const resetToken = jwt.sign({ studentId: student._id }, process.env.SECRET_KEY, { expiresIn: '10m' });
    
    return res.status(200).json({ message: "OTP verified", resetToken });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const studentResetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    
    // Verify token
    const decoded = jwt.verify(resetToken, process.env.SECRET_KEY);
    
    // Find user
    const student = await Student.findById(decoded.studentId);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Update password and clear reset fields
    student.password = hashedPassword;
    student.resetPasswordOTP = undefined;
    student.resetPasswordOTPExpiry = undefined;
    await student.save();
    
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
