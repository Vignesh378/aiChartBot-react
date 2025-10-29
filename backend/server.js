import express from"express";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/env.js";
import aiRouter from "./routers/ai.routes.js"
import authRouter from"./routers/User.routes.js"

const app=express();


//connectDB
connectDB();

app.use(express.json());
 app.use(cors({
        origin:'http://localhost:5173',
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    })
);
app.use("/api/ai", aiRouter);
app.use("/api/auth",authRouter);


const PORT=8000;
app.listen(PORT,()=>{
    console.log("server listening at :",PORT)
});