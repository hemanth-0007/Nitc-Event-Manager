import mongoose from "mongoose";
import { Role } from "../Enums/role.js";
const Schema = mongoose.Schema;



const adminSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    },
    password : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        default: Role.ADMIN,
        immutable: true,
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
});

function validateEmail(email){
    // regex for email validation
    const regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return regex.test(email);
}



const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
