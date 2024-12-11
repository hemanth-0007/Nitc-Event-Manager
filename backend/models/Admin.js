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
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
