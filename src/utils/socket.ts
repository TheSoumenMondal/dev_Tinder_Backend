import { Server as SocketIOServer } from "socket.io";
import http from "http";
import crypto from "crypto";
import serverConfig from "../config/serverConfig.js";
import { BaseError } from "../errors/baseError.js";
import ChatModel from "../models/chat.model.js";

const hashRoom = (userId1: string, userId2: string) => {
  const roomUsers = [String(userId1), String(userId2)].sort();
  return crypto.createHash("sha256").update(roomUsers.join("-")).digest("hex");
};

const initSocket = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: serverConfig.SOCKET_IO_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Join chat room logic
    socket.on("joinChat", ({ targetUserId, currentUserId }) => {
      if (!targetUserId || !currentUserId) return;
      const room = hashRoom(currentUserId, targetUserId);
      socket.join(room);
    });

    // Send message logic
    socket.on(
      "sendMessage",
      async ({ targetUserId, currentUserId, firstName, text }) => {
        if (!targetUserId || !currentUserId || !text?.trim()) return;

        const room = hashRoom(currentUserId, targetUserId);
        try {
          let chat = await ChatModel.findOne({
            participants: { $all: [currentUserId, targetUserId] },
          });

          // If no chat exists, create a new one
          if (!chat) {
            chat = await ChatModel.create({
              participants: [currentUserId, targetUserId],
              messages: [],
            });
          }

          // Push new message to the chat
          chat.messages.push({ sender: currentUserId, text });
          await chat.save();

          // Emit the message to the room
          io.to(room).emit("receiveMessage", {
            firstName,
            text,
            senderId: currentUserId, // Make sure you send senderId
          });
        } catch (error) {
          throw new BaseError("Failed to send message");
        }
      }
    );

    // Disconnect logic
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default initSocket;
