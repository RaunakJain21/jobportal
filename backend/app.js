import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
config({ path: "./config/config.env" });

const app = express();

// Enable CORS with credentials for cross-origin requests
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Your frontend URL (e.g., 'https://your-frontend.onrender.com')
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // Allow all HTTP methods
    credentials: true, // Allow credentials (cookies)
  })
);

// Middlewares for parsing cookies and JSON data
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes for different resources
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
