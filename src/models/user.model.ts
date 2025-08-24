import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/index.js";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    connectionCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: mongoose.Document & IUser, next) {
  if (!this.isModified || !this.isModified("password")) return next();
  if (!this.password) return next();
  try {
    const hashPass = await bcrypt.hash(this.password, 12);
    this.password = hashPass;
    next();
  } catch (err) {
    next(err as any);
  }
});

const UserModel = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default UserModel;
