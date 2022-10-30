import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getRandomVideos, getSubscribes, getTrend, getVideo, search, updateVideo } from "../controllers/video.controllers.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Create a video
router.post("/",verifyToken,addVideo);

// Update the video
router.put("/:id",verifyToken,updateVideo);

// Delete a video
router.delete("/:id",verifyToken,deleteVideo);

// Find video
router.get("/find/:id",getVideo);

// Update views
router.put("/view/:id",addView);

// Trends videos
router.get("/trend",getTrend);

// Random videos
router.get("/random",getRandomVideos);

// Subscribe videos
router.get("/sub",verifyToken,getSubscribes);

// Search by tags
router.get("/tags",getByTag);

// Search by video title
router.get("/search",search)

export default router;