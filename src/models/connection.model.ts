import mongoose from "mongoose";
import { IConnection } from "../types/index.js";

const connectionSchema = new mongoose.Schema<IConnection>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "rejected", "ignored", "interested"],
      required: true,
    },
  },
  { timestamps: true }
);

const ConnectionModel = mongoose.model<IConnection & mongoose.Document>(
  "Connection",
  connectionSchema
);

export default ConnectionModel;
