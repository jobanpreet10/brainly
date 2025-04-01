
import mongoose, {model , Schema } from "mongoose";

const linkSchema = new Schema({
    title : String,
    hash : String,
    userId : {
        type :mongoose.Types.ObjectId , 
        ref :'User' , 
        required : true,
        unique : true
    }
})

export const LinkModel = model("Link " , linkSchema)