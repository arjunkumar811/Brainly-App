"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
require('dotenv').config();
const mongoDbUrl = process.env.MONGODB_URL;
if (!mongoDbUrl) {
    throw new Error("MONGODB_URL environment variable is not defined");
}
mongoose_2.default.connect(mongoDbUrl);
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
const ContentSchema = new mongoose_1.Schema({
    title: String,
    link: String,
    tag: [{ type: mongoose_2.default.Types.ObjectId, ref: 'Tag' }],
    type: String,
    userId: { type: mongoose_2.default.Types.ObjectId, ref: 'User', require: true }
});
exports.ContentModel = (0, mongoose_1.model)("Content", ContentSchema);
const LinkSchema = new mongoose_1.Schema(({
    hash: String,
    userId: { type: mongoose_2.default.Types.ObjectId, ref: 'User', required: true, unique: true },
}));
exports.LinkModel = (0, mongoose_1.model)("Links", LinkSchema);
