import User from "../models/User.schema.js";
import bcrypt from "bcryptjs";
import {createError} from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req,res,next) => {
    
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password:hash});

        await newUser.save();
        res.status(200).send("User has been created");
    }catch(err){
        next(err);
    }
}

export const signin = async (req,res,next) => {
    try{
        const user = await User.findOne({name:req.body.name});
        if(!user){
            return next(createError(404,"The user not found"));
        }
        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrectPassword){
            return next(createError(400,"Password is not correct!"));
        }
        const token = jwt.sign({id:user._id},"parlak");
        const {password,...others} = user._doc;
        res.cookie("acces_token",token,{
            httpOnly:true
        }).status(200).json(others);
    }catch(err){
        next(err);
    }
}

export const googleAuthentication = async (req,res,next) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(user){
            const token = jwt.sign({id:user._id},"parlak");
            res.cookie("acces_token",token,{
                httpOnly:true
            }).status(200).json(user._doc);
        }else{
            const newUser = new User({
                ...req.body,
                fromGoogle:true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({id:savedUser._id},"parlak");
            res.cookie("acces_token",token,{
                httpOnly:true
            }).status(200).json(savedUser._doc);
        }
    } catch (error) {
        console.log("error => ",error)
        next(error)
    }
}