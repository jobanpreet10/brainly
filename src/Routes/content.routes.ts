import express from "express";
import contentModel from "../Models/content.models.js";
import userMiddleware from "../Middleware/user.middleware.js";

const contentRoute = express.Router();

contentRoute.post("/content", userMiddleware, async (req, res) : Promise<void> => {
    try {
        const { title,link,type,description } = req.body;
        const userId = req.userId; // No more TypeScript error

        if (!userId) {
             res.status(401).json({ message: "Unauthorized" });
             return 
        }

        await contentModel.create({
            title,
            link,
            type,
            description,
            userId,
            tags: [],
        });

        res.json({ message: "Content added successfully" });
    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ message: "Error while adding the content" });
    }
});

contentRoute.get("/content", userMiddleware, async (req, res) : Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
             res.status(401).json({ message: "Unauthorized" });
             return 
        }

        const content = await contentModel.find({ userId }).
        populate("userId" , "username")

        res.json({ content });
    } catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ message: "Error while fetching content" });
    }
});

contentRoute.delete("/content" , async( req, res) : Promise <void> =>{
    const contentId = req.body.contentId;

    await contentModel.deleteMany({
        contentId,
        userId : req.userId
    })
    res.json({
        message:"Content deleted"
    })

})

export default contentRoute;
