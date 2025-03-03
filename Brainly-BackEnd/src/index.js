"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var zod_1 = require("zod");
var bcrypt_1 = __importDefault(require("bcrypt"));
var db_1 = require("./db");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("./config");
var middleware_1 = require("./middleware");
var util_1 = require("./util");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requireBody, parseDataWithSuccess, _a, username, password, firstName, lastName, hashedPassword, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                requireBody = zod_1.z.object({
                    username: zod_1.z.string().min(5),
                    password: zod_1.z.string().min(5),
                });
                parseDataWithSuccess = requireBody.safeParse(req.body);
                if (!parseDataWithSuccess.success) {
                    res.status(400).json({
                        message: "Incorrect data format",
                        error: parseDataWithSuccess.error,
                    });
                }
                _a = req.body, username = _a.username, password = _a.password, firstName = _a.firstName, lastName = _a.lastName;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, db_1.UserModel.create({
                        username: username,
                        password: hashedPassword,
                    })];
            case 3:
                _b.sent();
                res.status(200).json({
                    message: "User signed up",
                });
                return [3 /*break*/, 5];
            case 4:
                e_1 = _b.sent();
                res.status(411).json({
                    message: "user already exist",
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/api/v1/signin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requireBody, parseDataWithSuccess, _a, username, password, Find, passwordMatch, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                requireBody = zod_1.z.object({
                    username: zod_1.z.string().email(),
                    password: zod_1.z.string().min(6),
                });
                parseDataWithSuccess = requireBody.safeParse(req.body);
                if (!parseDataWithSuccess) {
                    res.status(400).json({
                        message: "Incorrect Cridential",
                    });
                    return [2 /*return*/];
                }
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, db_1.UserModel.findOne({
                        username: username
                    })];
            case 1:
                Find = _b.sent();
                if (!Find) {
                    res.status(403).json({
                        message: "Invalid Credentials!",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, Find.password)];
            case 2:
                passwordMatch = _b.sent();
                if (!passwordMatch) {
                    res.status(403).json({
                        message: "Invalid Credentials!",
                    });
                    return [2 /*return*/];
                }
                if (passwordMatch) {
                    token = jsonwebtoken_1.default.sign({
                        id: Find._id
                    }, config_1.JWT_Token_pass);
                    // { expiresIn: "1h" }
                    res.status(200).json({
                        token: token,
                    });
                }
                else {
                    res.status(403).json({
                        message: "Invalid Credentials!",
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/v1/content", middleware_1.userMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var link, type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                link = req.body.link;
                type = req.body.type;
                return [4 /*yield*/, db_1.ContentModel.create({
                        link: link,
                        type: type,
                        title: req.body.title,
                        userId: req.userId,
                        tags: []
                    })];
            case 1:
                _a.sent();
                res.json({
                    message: "Content added"
                });
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/v1/content", middleware_1.userMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                return [4 /*yield*/, db_1.ContentModel.find({
                        userId: userId
                    }).populate("userId", "username")];
            case 1:
                content = _a.sent();
                res.json({
                    content: content
                });
                return [2 /*return*/];
        }
    });
}); });
app.delete("/api/v1/content", middleware_1.userMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contentId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contentId = req.body.contentId;
                return [4 /*yield*/, db_1.ContentModel.deleteMany({
                        contentId: contentId,
                        userId: req.userId
                    })];
            case 1:
                _a.sent();
                res.json({
                    message: "Message as been Deleted",
                });
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/v1/brain/:share", middleware_1.userMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var share;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                share = req.body.share;
                if (!share) return [3 /*break*/, 1];
                db_1.LinkModel.create({
                    userId: req.userId,
                    hash: (0, util_1.random)(10)
                });
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, db_1.LinkModel.deleteOne({
                    userId: req.userId,
                })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.json({
                    message: "Removed link"
                });
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/v1/brain/:shareLink", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, link, content, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hash = req.params.shareLink;
                return [4 /*yield*/, db_1.LinkModel.findOne({
                        hash: hash
                    })];
            case 1:
                link = _a.sent();
                if (!link) {
                    res.status(411).json({
                        message: "Sorry incorrect input"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.ContentModel.find({
                        userId: link.userId
                    })];
            case 2:
                content = _a.sent();
                return [4 /*yield*/, db_1.UserModel.findOne({
                        _id: link.userId
                    })];
            case 3:
                user = _a.sent();
                if (!user) {
                    res.status(411).json({
                        message: "User not found"
                    });
                    return [2 /*return*/];
                }
                res.json({
                    username: user.username,
                    content: content
                });
                return [2 /*return*/];
        }
    });
}); });
app.listen(3000);
