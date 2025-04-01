import mongoose from "mongoose";
// import {conn} from "./index.js"
import jwt from "jsonwebtoken";
// import { userModel } from "./Models/user.model.js";
import express  from "express";
const router = express.Router();

const app = express();

// router.post("/signup", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Create user in the database
//         await userModel.create({ username, password });

//         res.json({ message: "User Signed Up" });
//     } catch (error) {
//         res.status(500).json({ message: "Error signing up" });
//     }
// });

export default router;

app.post("/api/v1/sigin" ,(req,res) =>{

})

app.post("/api/v1/content", (req,res) =>{

})

app.get("/ap1/v1/content", (req,res) =>{

})

// app.listen(3000)