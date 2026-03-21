"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importStar(require("./db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.default)();
app.post("/api/v1/signup", async (req, res) => {
    //add zod validation here, hash the password, 
    const username = req.body.username;
    const password = req.body.password;
    try {
        await db_1.UserModel.create({
            username: username,
            password: password,
        });
        res.json({
            message: "user signup successfull"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists."
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials."
        });
    }
});
app.post("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const link = req.body.link;
    const title = req.body.title;
    try {
        await db_1.ContentModel.create({
            //@ts-ignore
            userId: req.userId,
            title,
            link,
            tags: []
        });
        res.json({
            message: "content added"
        });
    }
    catch (e) {
        res.status(401).json({
            message: "Unable to upload contents."
        });
    }
});
app.get("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
app.delete("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    try {
        await db_1.ContentModel.deleteMany({
            contentId,
            //@ts-ignore
            userId: req.userId
        });
        return res.json({
            message: "Deleted"
        });
    }
    catch (e) {
        res.status(401).json({
            message: "Unable to delete content"
        });
    }
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await db_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        else {
            const hash = (0, utils_1.random)(10);
            await db_1.LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            });
            res.json({
                message: "/" + hash
            });
        }
    }
    else {
        await db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Removed link"
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            messagse: "incorrect link,  user link not exists"
        });
        return;
    }
    const content = await db_1.ContentModel.find({
        userId: link?.userId,
    });
    const user = await db_1.UserModel.findOne({
        userId: link.userId
    });
    res.json({
        username: user?.username,
        content
    });
});
app.listen(3000, () => {
    console.log("connected to server");
});
//# sourceMappingURL=index.js.map