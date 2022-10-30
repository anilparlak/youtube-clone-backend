import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(cors());
dotenv.config();

const connetDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connection to DB is successfully"))
    .catch((err) => {
        throw err;
    });
};
app.get('/',function(req,res){
 
    res.send(`
        <div style="display:flex; flex-direction:column;  align-items:center; height:100vh; width:100%;" >
            <h1> This API is made by Anıl Parlak for <em>Youtube Clone</em> </h1>
        </div>
    `)
  });
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);

app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.listen(process.env.PORT || 5050, () => {
    connetDB();
    console.log("Server is running!")
});
