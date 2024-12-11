import mongoose from "mongoose";
import { Role } from "../Enums/role";
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
     
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
