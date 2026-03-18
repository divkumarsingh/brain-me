import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());


app.post("api/v1/signin", (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;


    res.json({
        message: "signup successfull"
    });
})

app.get("api/v1/sign", (req, res) => {


    res.status(201).json({
        message: "signin successfull"})
});

app.post("api/v1/content", (req, res) =>{


    res.send({
        msg: "content posted successfully"
    })
})

app.get("api/v1/content", (req, res)=>{


    res.send({

    })
})

app.delete("api/v1/content", (req, res) => {
    
});


app.listen(3000, ()=>{
    console.log("connected to server");
})