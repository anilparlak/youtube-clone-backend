import express from "express";
import { googleAuthentication, signin, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

// Create a user route
router.post("/signup",signup)

// Sing In route
router.post("/signin",signin)

// Google authentication route
router.post("/google",googleAuthentication)



export default router;