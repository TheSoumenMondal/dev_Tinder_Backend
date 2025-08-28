import { Server as SocketIOServer } from "socket.io";
import http from "http";
import crypto from "crypto";
import serverConfig from "../config/serverConfig.js";

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
    socket.on("joinChat", ({ targetUserId, currentUserId }) => {
      if (!targetUserId || !currentUserId) return;
      const room = hashRoom(currentUserId, targetUserId);
      socket.join(room);
    });

    socket.on(
      "sendMessage",
      ({ targetUserId, currentUserId, firstName, text }) => {
        if (!targetUserId || !currentUserId || !text?.trim()) return;
        const room = hashRoom(currentUserId, targetUserId);
        io.to(room).emit("receiveMessage", {
          firstName,
          text,
          senderId: currentUserId,
        });
      }
    );

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default initSocket;
