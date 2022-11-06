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
app.use(cookieParser());
app.use(express.json());
const connetDB = () => {
    //   mongoose
    //     .connect(process.env.MONGO_URL, {
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //     })
    //     .then(() => console.log("Connection to DB is successfully"))
    //     .catch((err) => {
    //       throw err;
    //     });
    mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (!err) {
          console.log("Successfully Established Connection with MongoDB");
        } else {
          console.log(
            "Failed to Establish Connection with MongoDB with Error: " + err
          );
        }
      }
    );
  };

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

app.listen(process.env.PORT || 5000, () => {
    connetDB();
    console.log("Server is running!")
});
