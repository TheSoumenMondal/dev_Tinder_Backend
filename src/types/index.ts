import { Document, ObjectId } from "mongoose";

export type connectionType = "accepted" | "rejected" | "ignored" | "interested";

export interface ILike extends Document {
  project: string;
  likedBy: string;
}

export interface IProject extends Document {
  name: string;
  description: string;
  githubUrl: string;
  hostedUrl?: string;
  rating: number;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  bio?: string;
  age?: number;
  email: string;
  password: string;
  avatarUrl?: string;
  connectionCount : number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  message: string;
  error: string | null;
  statusCode: number;
}

export interface IConnection extends Document {
  senderId: ObjectId;
  receiverId: ObjectId;
  status: connectionType;
}
