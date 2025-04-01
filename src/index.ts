import mongoose from "mongoose";
import "dotenv/config";
import express from "express";
import cors from 'cors';

import signupRoute from "./Routes/user.routes.js";
import contentRoute from "./Routes/content.routes.js";
import userMiddleware from "./Middleware/user.middleware.js";
import shareRoute from "./Routes/share.routes.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());
const mongoUrl: string | undefined = process.env.MONGO_URL;
console.log(mongoUrl);

if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("MongoDB Connected Successfully");

        // Start the server only after DB connection is successful
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1); // Exit process with failure
    }
};

// Call the function to connect and start the server
connectDB();

// Attach routes
app.use("/api/v1", signupRoute);
// @ts-ignore
app.use("/api/v1", userMiddleware ,contentRoute);
// app.get("/api/v1", userMiddleware, contentRoute);

app.use("/api/v1", userMiddleware , shareRoute)
