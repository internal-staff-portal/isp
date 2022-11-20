import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the interface for a user
export interface IUser {
  _id: string;
  active: boolean;
  email: string;
  fullname: string;
  handle: string;
  hashedPassword: string;
}

//the user schema
const UserSchema = new Schema<IUser>({
  _id: {
    default: v4,
    type: String,
    required: true,
  },
  active: {
    default: true,
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

//the user model
export const UserModel = model("user", UserSchema);
