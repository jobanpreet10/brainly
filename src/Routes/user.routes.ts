import express, { application, Router } from "express";
import  userModel  from "../Models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import config from "../config.js";

const signupRoute = express.Router();



signupRoute.post("/signup", async ( req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        await userModel.create({username , password});
        res.json({
            message : "User Signed Up sucessfully"
        })
    }
    catch(error){
        res.status(500).json({meassage: "Error while sign up"})
    }
})


signupRoute.post("/signin", async (req ,res) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        const existingUser = await userModel.findOne({
            username,
            password
        })
        console.log(existingUser);

        
        if(existingUser){
            console.log("found user");
            const token = jwt.sign({
                
                id : existingUser._id
            }, config.JWT_PASSWORD)
            res.json({token})
        }
        else{
            res.json("Incorrect Credentials")
        }
        
    }
    catch(error){
        res.status(500).json({message : " Got a error"})
    }
})

export default signupRoute;