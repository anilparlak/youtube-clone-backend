import Comment from "../models/Comment.schema.js";

export const addComment = async (req,res,next) => {
    const newComment = new Comment({...req.body,userId:req.user.id})
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req,res,next) => {

    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("The comment has been deleted");
    } catch (error) {
        next(error)
    }
}

export const getComments = async (req,res,next) => {
    try {
        const comments = await Comment.find({videoId:req.params.videoId});
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}