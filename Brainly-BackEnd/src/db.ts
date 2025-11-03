import { model, Schema } from "mongoose";
import mongoose from "mongoose";

require('dotenv').config();

const mongoDbUrl: string | undefined = process.env.MONGODB_URL;

if (!mongoDbUrl) {
  throw new Error("MONGODB_URL environment variable is not defined");
}

mongoose.connect(mongoDbUrl);
 


const userSchema = new Schema ({
  email: {type: String, unique: true, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
});

export const UserModel = model("User", userSchema);

const ContentSchema = new Schema ({
  title: String,
  link: String,
  tag: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
  type: String,
  userId: {type: mongoose.Types.ObjectId, ref: 'User', require: true}

})

export const ContentModel = model("Content", ContentSchema);


const LinkSchema = new Schema(({
  hash: String,
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true , unique: true },
}))


export const LinkModel  = model("Links", LinkSchema)




