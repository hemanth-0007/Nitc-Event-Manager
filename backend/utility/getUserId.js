import jwt from "jsonwebtoken";


export const getUserIdFromToken = (token) => {
    if (token === undefined || token === null || token === ""){
        return new Error("Invalid token");
    }

  jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
    if (error) {
        return new Error("Token verification failed");
    } 
    else {
        console.log(payload.id);
        return payload.id;
    }
    });
}