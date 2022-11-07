import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export  const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
 
    if(!authHeader){
        return next(createError(401,"You are not authenticated"));
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY, (err,user) => {
        if(err){
            return next(createError(403,"Token is not valid"));
        }
        req.user = user;
        next();
    })
}