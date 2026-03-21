import express from "express";
import mongoose from "mongoose";
import connectDB, { ContentModel, LinkModel, UserModel } from "./db";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";


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

        return res.json({
            message: "Deleted"
        })
    }catch(e){
        res.status(401).json({
            message: "Unable to delete content"
        })

    }
});

app.post("/api/v1/brain/share", userMiddleware, async(req, res) => {
    const share = req.body.share;
    if(share) {
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if(existingLink){
            res.json({
                hash: existingLink.hash
            })
            return;
        }else {
            const hash = random(10);
            await LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            });

            res.json({
            message: "/" + hash
            });
        }
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });

        res.json({
            message: "Removed link"
        })
    }

});

app.get("/api/v1/brain/:shareLink", async (req, res) =>{
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            messagse: "incorrect link,  user link not exists"
        });
        return;
    }

    
    const content = await ContentModel.find({
       userId: link?.userId,
    });

    const user = await UserModel.findOne({
        userId: link.userId
    })

    res.json({
        username: user?.username,
        content
    })


})


app.listen(3000, ()=>{
    console.log("connected to server");
})