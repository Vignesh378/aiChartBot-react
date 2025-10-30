import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/env.js";
import aiRouter from "./routers/ai.routes.js"
import authRouter from "./routers/User.routes.js"

const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://aichartbot-react.vercel.app', 'https://aichartbot-react-git-main-vignesh378.vercel.app']
        : 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to AIChartBot API' });
});

app.use("/api/ai", aiRouter);
app.use("/api/auth", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});