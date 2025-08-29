import e from "express";
import { fetchChats } from "../../controllers/chat.controller.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";
const chatRoute = e.Router();

// expect receiverId as a route param for fetching chats between two users
chatRoute.get("/:receiverId", authenticateToken, fetchChats);

export default chatRoute;
