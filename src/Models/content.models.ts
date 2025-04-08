import mongoose , {model, Schema } from "mongoose"

const contentSchema = new Schema({
    title: String,
    link: String,
    type : String,
    description: String,
    tags : 
        [{ type : mongoose.Types.ObjectId ,
        ref :'Tags' }],

    userId : {
        type:mongoose.Types.ObjectId , 
        ref :'User' , 
        required : true
    }
})

const contentModel = model ("Content" , contentSchema);

export default contentModel;