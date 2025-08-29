import mongoose from "mongoose";
import messageSchema from "./message.model.js";

const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  messages: [messageSchema],
});

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;
