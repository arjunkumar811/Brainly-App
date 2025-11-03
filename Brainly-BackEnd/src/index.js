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
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        name: zod_1.z.string().min(2),
    });
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.status(400).json({
            message: "Invalid input",
            error: parseDataWithSuccess.error,
        });
        return;
    }
    const { email, password, name } = req.body;
    try {
        const existingUser = await db_1.UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists. Please sign in.",
            });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await db_1.UserModel.create({
            email: email,
            password: hashedPassword,
            name: name,
        });
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, config_1.JWT_Token_pass, { expiresIn: "7d" });
        res.status(201).json({
            token,
            user: { id: user._id, email: user.email, name: user.name },
            message: "User created successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error creating user",
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const requireBody = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    });
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.status(400).json({
            message: "Invalid input",
        });
        return;
    }
    const { email, password } = req.body;
    try {
        const user = await db_1.UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "User not found. Please sign up.",
            });
            return;
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(400).json({
                message: "Invalid credentials",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, config_1.JWT_Token_pass, { expiresIn: "7d" });
        res.status(200).json({
            token,
            user: { id: user._id, email: user.email, name: user.name },
            message: "Signed in successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error signing in",
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
    }).populate("userId", "name email");
    res.json({
        content
    });
});
app.delete("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await db_1.ContentModel.deleteMany({
        _id: contentId,
        userId: req.userId
    });
    res.json({
        message: "Message as been Deleted",
    });
});
app.post("/api/v1/brain/:share", middleware_1.userMiddleware, async (req, res) => {
    const share = req.params.share;
    if (share) {
        await db_1.LinkModel.create({
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
        name: user.name,
        email: user.email,
        content: content
    });
});
app.listen(3000);
