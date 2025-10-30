import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/env.js";
import aiRouter from "./routers/ai.routes.js"
import authRouter from "./routers/User.routes.js"

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ['https://ai-chart-bot-react-5lph-vigneshs-projects-64e3c535.vercel.app',
             'https://ai-chart-bot-react.vercel.app', 
             'https://ai-chart-bot-react-git-main-vigneshs-projects-64e3c535.vercel.app', 
             'https://ai-chart-bot-react-eight.vercel.app', 
             'https://ai-chart-bot-react-vignesh378.vercel.app', 
             'http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));


// Database connection
let isConnected = false;
const connectToDatabase = async () => {
    if (isConnected) return;
    try {
        await connectDB();
        isConnected = true;
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Routes
app.get('/', async (req, res) => {
    try {
        await connectToDatabase();
        res.json({ message: 'Welcome to AIChartBot API' });
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

// Test route
app.options('*', cors());
app.get('/test', async (req, res) => {
    try {
        await connectToDatabase();
        res.json({ status: 'Backend is working!' });
    } catch (error) {
        res.status(500).json({ message: 'Test failed', error: error.message });
    }
});

app.use("/api/ai", async (req, res, next) => {
    await connectToDatabase();
    next();
}, aiRouter);

app.use("/api/auth", async (req, res, next) => {
    await connectToDatabase();
    next();
}, authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running in development mode on port ${PORT}`);
    });
}

// For Vercel serverless deployment
export default app;