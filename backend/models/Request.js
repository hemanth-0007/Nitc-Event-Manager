import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {Role} from '../Enums/role.js';
import { StatusType } from '../Enums/StatusType.js';
import { RequestType } from '../Enums/RequestType.js';
import {LocationArray, Places} from '../Enums/Location.js';


const requestSchema = new Schema({
    
    title :{
        type: String,
        required: true,
        minLength: [3, 'Title must be at least 3 characters long'],
        maxLength: [50, 'Title must be at most 50 characters long']
    },
    description : {
        type: String,
        required: true,
        minLength: [10, 'Description must be at least 10 characters long'],
        maxLength: [500, 'Description must be at most 500 characters long']
    },
    category: {
        type: String,
        required: true,
        enum: [RequestType.VENUE, RequestType.BUS],
        default: RequestType.NONE
    },
    status : {
        type: String,
        required: true,
        default: StatusType.PENDING,
        enum: [StatusType.ACCEPTED, StatusType.PENDING, StatusType.REJECTED]
    },
    startTime : {
        type: Date,
        required: true
    },
    endTime : {
        type: Date,
        required: true
    },
    location : {
        type: String,
        enum : LocationArray,
        default : Places.NONE,
        required: true
    },
    document : {
        type: Buffer,
        // required: true,
        default : null
    },
    faculty : {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    student :{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    comments : [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default : []
    }] 
},
{
    timestamps: true
});

 


const Request = mongoose.model('Request', requestSchema);
 
export default Request;