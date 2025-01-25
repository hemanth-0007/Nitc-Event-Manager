import mongoose from "mongoose";

import { notificationType } from "../Enums/notificationType.js";
import {Role} from '../Enums/role.js';

const Schema = mongoose.Schema;



const notificationSchema = new Schema({
     sender : {
        type : String,
        enum : [Role.STUDENT, Role.FACULTY],
        required : true
     },
     student : {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
     },
     faculty :{
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
     },
     isRead : {
         type : Boolean,
         default : false
     },
     message : {
         type : String,
         required : true
     },
     request : {
        type: Schema.Types.ObjectId,
        ref: 'Request',
        required: true,
     },
     type : {
         type : String,
         enum : [notificationType.ACCEPT, notificationType.REJECT, notificationType.COMMENT],
         required : true      
     }
},
{
    timestamps: true,
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
