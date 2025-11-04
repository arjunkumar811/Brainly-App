
import { Request, Response } from 'express';
import express from 'express';
import { z } from 'zod'; 
import bcrypt from 'bcrypt';
import { ContentModel, LinkModel, UserModel } from './db';
import jwt from "jsonwebtoken";
import { JWT_Token_pass } from './config';
import { userMiddleware } from './middleware';
import { random } from './util';
import cors from 'cors';

interface AuthRequest extends Request {
    userId?: string; 
  }

         


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Brainly API is running" });
});



app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {
   
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
    });
    
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success) {
        res.status(400).json({
            message: "Invalid input",
            error: parseDataWithSuccess.error,
        });
        return
    }

    const {email, password, name} = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        
        if (existingUser) {
            res.status(400).json({
                message: "User already exists. Please sign in.",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create ({
            email: email,
            password: hashedPassword,
            name: name,
        });

        const token = jwt.sign({
            id: user._id
        }, JWT_Token_pass, { expiresIn: "7d" });

        res.status(201).json({
            token,
            user: { id: user._id, email: user.email, name: user.name },
            message: "User created successfully",
        });

    } catch (e) {
        res.status(500).json({
            message: "Error creating user",   
        });
    }

})  




app.post("/api/v1/signin", async (req: Request, res: Response): Promise<void> => {
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success) {
        res.status(400).json({
            message: "Invalid input",
        });
        return;
    }

    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if(!user) {
            res.status(400).json({
                message: "User not found. Please sign up.",
            });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(400).json({
                message: "Invalid credentials",
            });
            return;
        }

        const token = jwt.sign({
            id: user._id
        }, JWT_Token_pass, { expiresIn: "7d" });

        res.status(200).json({
            token,
            user: { id: user._id, email: user.email, name: user.name },
            message: "Signed in successfully",
        });
    } catch (e) {
        res.status(500).json({
            message: "Error signing in",
        });
    }
});


app.post("/api/v1/content", userMiddleware, async (req: AuthRequest, res:Response) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

     res.json({
        message: "Content added"
    })

})

app.get("/api/v1/content", userMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "name email");

    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req: AuthRequest, res: Response) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
       _id: contentId,
        userId: req.userId
    }) 

    res.json({
        message: "Message as been Deleted",
    })
})



app.post("/api/v1/brain/share",  userMiddleware, async (req: AuthRequest, res: Response) => {
    const share = req.body.share;
    
    try {
        if(share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if(existingLink) {
                res.json({
                    hash: existingLink.hash
                });
                return;
            }

            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            });

            res.json({
                hash: hash
            });
        } else {
            await LinkModel.deleteOne({
                userId: req.userId,
            });

            res.json({
                message: "Share link removed"
            });
        }
    } catch(e) {
        res.status(500).json({
            message: "Error creating share link"
        });
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

   const link =  await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
         message: "Sorry incorrect input"
        })
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

const user = await UserModel.findOne({
    _id: link.userId
})

if(!user) {
    res.status(411).json({
        message: "User not found"
       })
       return;
}


    res.json({
      name: user.name,
      email: user.email,
      content: content
    })

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});