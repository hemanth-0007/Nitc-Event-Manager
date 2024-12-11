import mongoose from "mongoose";
import { Role } from "../Enums/role.js";
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    sender:{
        type : String,
        enum : [Role.STUDENT, Role.FACULTY],
        required : true
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    content: {
        type: String,
        required: true,
        minLength: [6, "Comment must be at least 6 characters long"],
        maxLength: [150, "Comment must be at most 150 characters long"],
    },
    createdAt : {
        type : Date,
        default : Date.now,
        immutable : true
    }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
