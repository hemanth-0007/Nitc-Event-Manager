import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,  
        pass: process.env.GMAIL_APP_PASSWORD  
    }
});
 
// Function to send OTP email
export const sendMail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.GMAIL,  
            to: email, 
            subject: 'Your OTP for verification',
            text: `Your OTP is: ${otp}. This OTP is valid for 10 minutes.`,
            html: `<h2>Your OTP for verification</h2>
                   <p>Your OTP is: <strong>${otp}</strong></p>
                   <p>This OTP is valid for 10 minutes.</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

 