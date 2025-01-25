import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {Role} from '../Enums/role.js';
import { Departments, departmentArray } from '../Enums/department.js';

const facultySchema = new Schema({
  
    name: {
        type: String,
        required: true,
        validate:{
            validator: function(v){
                return /^[a-zA-Z\s]*$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
        }
    },
    department: {
        type : String,
        required: true,
        enum : departmentArray,
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
    students : [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        default: [],
    }],
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
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    role : {
        type: String,
        default: Role.FACULTY,
        immutable: true,
    },
},{
    timestamps: true,
});

function validateEmail(email){
    // regex for email validation
    const regex = /^[a-zA-Z0-9._%+-]+@nitc\.ac\.in$/;
    return regex.test(email);
}


const Faculty = mongoose.model('Faculty', facultySchema);
 
export default Faculty;