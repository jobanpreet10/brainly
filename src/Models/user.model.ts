// import {conn} from "./index.js"
import mongoose, { model, Schema } from "mongoose";

const UserShema = new Schema({
    username : {
        type : String,
        unique : true   // allows mongoose to block the request if user exists but we can do it directly in database 
    },
    password : String
})

const userModel = model ("User" , UserShema);

export default userModel;