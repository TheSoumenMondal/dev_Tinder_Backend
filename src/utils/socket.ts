import { Server as SocketIOServer } from "socket.io";
import http from "http";
import serverConfig from "../config/serverConfig.js";

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
      // Create a consistent room ID by sorting the user IDs alphabetically
      // This ensures both users join the same room regardless of who initiates
      const roomUsers = [String(currentUserId), String(targetUserId)].sort();
      const room = roomUsers.join("-");
      socket.join(room);
      console.log(`📌 ${currentUserId} joined ${room}`);
    });

    socket.on(
      "sendMessage",
      ({ targetUserId, currentUserId, firstName, text }) => {
        if (!targetUserId || !currentUserId || !text?.trim()) return;
        // Use the same consistent room ID creation logic as joinChat
        const roomUsers = [String(currentUserId), String(targetUserId)].sort();
        const room = roomUsers.join("-");
        io.to(room).emit("receiveMessage", {
          firstName,
          text,
          senderId: currentUserId,
        });
        console.log(`💬 ${currentUserId} -> ${room}: ${text}`);
      }
    );

    socket.on("disconnect", () => {
      console.log("❌ A user disconnected:", socket.id);
    });
  });
};

export default initSocket;
