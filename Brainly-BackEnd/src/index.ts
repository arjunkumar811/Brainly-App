
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



app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {
   
    const requireBody = z.object({
        username: z.string().min(5),
        password: z.string().min(5),
    });
    


const parseDataWithSuccess = requireBody.safeParse(req.body);

if(!parseDataWithSuccess.success) {
    res.status(400).json({
        message: "Incorrect data format",
        error: parseDataWithSuccess.error,
    });
    return
}

const {username, password, firstName, lastName} = req.body;
const hashedPassword = await bcrypt.hash(password, 10);


    try {
   await UserModel.create ({
    username: username,
    password: hashedPassword,
   });

   res.status(200).json({
    message: "User signed up",
   });

}  catch (e) {
    res.status(411).json({
        message: "user already exist",   
   });
}

})  




app.post("/api/v1/signin", async (req: Request, res: Response): Promise<void> => {
const requireBody = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
});

const parseDataWithSuccess = requireBody.safeParse(req.body);

if(!parseDataWithSuccess.success) {
     res.status(400).json({
        message: "Incorrect Cridential",
    });
    return;
}

const {username, password} = req.body;

const Find = await UserModel.findOne({
    username
});

if(!Find) {
     res.status(403).json({
        message: "Invalid Credentials!",
    });
    return;
}

const passwordMatch = await bcrypt.compare(password, Find.password);

if (!passwordMatch) {
   res.status(403).json({
        message: "Invalid Credentials!",
    });
    return;
}

if (passwordMatch) {
    const token = jwt.sign({
        id: Find._id
    }, JWT_Token_pass as string,
);
 { expiresIn: "1h" }
    res.status(200).json({
        token,
    });
} else {
    res.status(403).json({
        message: "Invalid Credentials!",
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
    }).populate("userId", "username");

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



app.post("/api/v1/brain/:share",  userMiddleware, async (req: AuthRequest, res: Response) => {
    const share = req.params.share;
    if(share) {
     await LinkModel.create({
            userId: req.userId,
            hash: random(10)
        })
    } else {
       await LinkModel.deleteOne({
            userId: req.userId,
        });
    }

    res.json({
      message: "Removed link"
    }) 
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
      username: user.username,
      content: content
    })

})

app.listen(3000);