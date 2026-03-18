"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("api/v1/signin", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    res.json({
        message: "signup successfull"
    });
});
app.get("api/v1/sign", (req, res) => {
    res.status(201).json({
        message: "signin successfull"
    });
});
app.post("api/v1/content", (req, res) => {
    res.send({
        msg: "content posted successfully"
    });
});
app.get("api/v1/content", (req, res) => {
    res.send({});
});
app.delete("api/v1/content", (req, res) => {
});
app.listen(3000, () => {
    console.log("connected to server");
});
//# sourceMappingURL=index.js.map