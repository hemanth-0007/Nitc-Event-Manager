import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {Role} from '../Enums/role.js';
import { Departments, departmentArray } from '../Enums/department.js';


const studentSchema = new Schema({
  
    name: {
        type: String,
        required: true,
        validate:{
            validator: function(v){
                return /^[a-zA-Z\s.]*$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
        }
    },
    department: {
        type : String,
        required: true,
        enum : departmentArray,
    },
    rollNo: {
        type: String,
        required: true,
        unique: true,
        immutable : true
    },
    profileUrl:{
        type: String,
        default: 'https://res.cloudinary.com/drvnhpatd/image/upload/v1730537952/ftk3dmaao954aroyfpme.jpg'
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        validate:{
            validator: function(v){
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!
            Please enter a 10 digit phone number without any spaces or special characters`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,     
        immutable: true,
        lowercase: true,
        validate:{
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        // immutable: true,  // not required
    },
    faculty : {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        default : null,
        required: true,
    },
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request',
        default: [],
    }],
    notifications : [{
        type: Schema.Types.ObjectId,
        ref: 'Notification',
        default: [],
    }],
    role : {
        type: String,
        default: Role.STUDENT,
        immutable: true,
    },
    resetPasswordOTP: {
        type: String,
        default: null,
    },
    resetPasswordOTPExpiry: {
        type: Date,
        default: null,
    },
},
{
    timestamps: true,
});

function validateEmail(email){
    // regex for email validation
    const nitcMailRegex = /^[a-zA-Z0-9._%+-]+@nitc\.ac\.in$/;
    return nitcMailRegex.test(email);
}



const Student = mongoose.model('Student', studentSchema);
 
export default Student;