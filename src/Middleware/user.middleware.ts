import { NextFunction, Request, Response } from "express";
import config from "../config.js";
import jwt from "jsonwebtoken";

// Extend Request type to include userId
interface AuthRequest extends Request {
    userId?: string;
}

const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    console.log("Request Headers:", req.headers);

    const header = req.headers["authorization"];
    if (!header) {
        res.status(401).json({ message: "Authorization header is missing" });
        return;
    }

    const token = header.split(" ")[1]; // Extract token from "Bearer <token>"

    try {
        const decoded = jwt.verify(token, config.JWT_PASSWORD) as { id: string };
        console.log("Token Verified Successfully");

        req.userId = decoded.id; // Now TypeScript knows userId exists on req
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default userMiddleware;
