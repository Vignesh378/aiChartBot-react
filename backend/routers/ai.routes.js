import express from  "express"
import {parseResponseFromText} from "../Controllers/ai.Controller.js"
import { protect } from "../middleware/authMiddleware.js";

const router=express.Router();


router.post("/generate",protect,parseResponseFromText)



export default router;