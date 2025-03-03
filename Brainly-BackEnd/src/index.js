"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const util_1 = require("./util");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", async (req, res) => {
    const requireBody = zod_1.z.object({
        username: zod_1.z.string().min(5),
        password: zod_1.z.string().min(5),
    });
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }
    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        await db_1.UserModel.create({
            username: username,
            password: hashedPassword,
        });
        res.status(200).json({
            message: "User signed up",
        });
    }
    catch (e) {
        res.status(411).json({
            message: "user already exist",
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const requireBody = zod_1.z.object({
        username: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    });
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess) {
        res.status(400).json({
            message: "Incorrect Cridential",
        });
        return;
    }
    const { username, password } = req.body;
    const Find = await db_1.UserModel.findOne({
        username
    });
    if (!Find) {
        res.status(403).json({
            message: "Invalid Credentials!",
        });
        return;
    }
    const passwordMatch = await bcrypt_1.default.compare(password, Find.password);
    if (!passwordMatch) {
        res.status(403).json({
            message: "Invalid Credentials!",
        });
        return;
    }
    if (passwordMatch) {
        const token = jsonwebtoken_1.default.sign({
            id: Find._id
        }, config_1.JWT_Token_pass);
        // { expiresIn: "1h" }
        res.status(200).json({
            token,
        });
    }
    else {
        res.status(403).json({
            message: "Invalid Credentials!",
        });
    }
});
app.post("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await db_1.ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
});
app.get("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
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
    await db_1.ContentModel.deleteMany({
        contentId,
        userId: req.userId
    });
    res.json({
        message: "Message as been Deleted",
    });
});
app.post("/api/v1/brain/:share", middleware_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        db_1.LinkModel.create({
            userId: req.userId,
            hash: (0, util_1.random)(10)
        });
    }
    else {
        await db_1.LinkModel.deleteOne({
            userId: req.userId,
        });
    }
    res.json({
        message: "Removed link"
    });
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    const content = await db_1.ContentModel.find({
        userId: link.userId
    });
    const user = await db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User not found"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
});
app.listen(3000);
