
import { Role } from "../Enums/role.js";


export const isAdmin = async (req, res, next) => {
     
    if(req.role !== Role.ADMIN){
        return res.status(403).send({message : "Unauthorized Access, only admin can access this resource"});
    }
    next();
}