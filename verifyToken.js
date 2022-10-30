import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export  const verifyToken = (req,res,next) => {
    const token = req.cookies.acces_token;
    if(!token){
        console.log("token yok")
        return next(createError(401,"You are not authenticated"));
        
    }
    jwt.verify(token,process.env.SECRET_KEY, (err,user) => {
        if(err){
            console.log("token geçersiz")
            return next(createError(403,"Token is not valid"));
            
        }
        req.user = user;
        next();
    })
}