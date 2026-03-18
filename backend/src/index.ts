import express from "express";
import mongoose from "mongoose";
import connectDB, { ContentModel, UserModel } from "./db";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userMiddleware } from "./middleware";


const app = express();
app.use(express.json());
connectDB();


app.post("/api/v1/signup", async(req,res) =>{
    //add zod validation here, hash the password, 
    const username = req.body.username;
    const password = req.body.password;

    try{
        await UserModel.create({
        username: username,
        password: password,
    });

    res.json({
        message: "user signup successfull"
    });
    }catch(e) {
        res.status(411).json({
            message: "User already exists."
        })
    }
    
});

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    });

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, (process.env.JWT_SECRET as string));

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials."
        })
    }


    res.status(200).json({
        message: "signin successfull"})
});

app.post("/api/v1/content", userMiddleware, async(req, res) =>{
    const link = req.body.link;
    const title = req.body.title;
    try{
        await ContentModel.create({
            //@ts-ignore
            userId: req.userId,
            title,
            link,
            tags: []
        })

        res.json({
            message: "content added"
        })
    }catch(e){
        res.status(401).json({
            message: "Unable to upload contents."
        })
    }
})

app.get("/api/v1/content", userMiddleware, async(req, res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");

    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async(req, res) => {
    const contentId = req.body.contentId;
    
    try{
        await ContentModel.deleteMany({
            contentId,
            //@ts-ignore
            userId: req.userId
        })

        res.json({
            message: "Deleted"
        })
    }catch(e){
        res.status(401).json({
            message: "Unable to delete content"
        })

    }
});

app.post("/api/v1/brain/share", (req, res) => {

});

app.get("/api/v1/brain/:shareLink", (req, res) =>{
    
})


app.listen(3000, ()=>{
    console.log("connected to server");
})