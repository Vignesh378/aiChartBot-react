import express from "express"
import {registerUser,loginUser,getUserProfile,updateUserProfile} from "../Controllers/User.Controller.js"

const router=express.Router();


router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/profile",getUserProfile);
router.put("/profile",updateUserProfile);

export default router;