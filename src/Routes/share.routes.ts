import express  from "express";
import { LinkModel } from "../Models/links.models.js";
import userMiddleware from "../Middleware/user.middleware.js";
import { random } from "../utils/random.js";
import contentModel from "../Models/content.models.js";
import userModel from "../Models/user.model.js";
const shareRoute = express.Router();

shareRoute.post("/brain/share" , userMiddleware , async (req, res) => {
    const share = req.body.share;
      if(share){
        const ExistingLink = await LinkModel.findOne({
            userId: req.userId
        })
        if(ExistingLink){
            res.json({
                hash : ExistingLink.hash
            })
            return
        }

        const hash = random(10)
        await LinkModel.create({
            userId : req.userId,
            hash : hash
        })
        res.json({
            message : "/share/" + hash
        })
      }
      else {
       await  LinkModel.deleteOne({
            userId : req.userId
        })
      }

      res.json({
        message : "Removed link"
      })
})


shareRoute.get("/brain/:shareLink" , async (req, res) => {
    const hash = req.params.shareLink

    const link = await LinkModel.findOne({
        hash
    })

    if(!link){
        res.status(411).json({
            message: " Sorry incorrect input"
        })
        return;
    }

    const content = await contentModel.findOne({
        userId : link.userId
    })

    const user = await userModel.findOne({
        _id : link.userId
    })

    if(!user){
        res.status(411).json({
            message: " User not found , ideally should not happen"
        })
        return
    }

    res.json({
        username : user.username,
        content : content
    })


})


export default shareRoute;