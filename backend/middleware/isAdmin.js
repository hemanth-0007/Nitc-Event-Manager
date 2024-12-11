import Admin from "../models/Admin.js";


export const isAdmin = async (req, res, next) => {
    const {id} = req.id;
    if(!id) 
        return res.status(400).json({message: "Invalid token"});
    try {
        const admin = await Admin.findById(id);
        if(!admin) 
            return res.status(403).json({message: "Unauthorized access"});
        next();
    } catch (error) {
        return res.status(500).json({message: error.message});  
    }
}