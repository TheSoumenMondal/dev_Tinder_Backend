import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ChatService from "../services/chat.service.js";
import ChatRepository from "../repository/chat.repository.js";
import { generateApiResponse } from "../utils/apiResponse.js";
import { JwtStrategy } from "../utils/jwt.js";
import { JwtPayload } from "jsonwebtoken";

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);

export const fetchChats = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;
    const decodedData = JwtStrategy.verifyJwt(token) as JwtPayload;
    const senderId = decodedData.userId;

    const receiverId = String(req.params.receiverId);

    if (!senderId || !receiverId) {
      return generateApiResponse(res, {
        data: null,
        message: "Missing query parameters: sender and receiver are required",
        error: "BAD_REQUEST",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    const chats = await chatService.fetchChats([senderId, receiverId]);

    return generateApiResponse(res, {
      data: chats,
      message: "Chats fetched successfully",
      error: null,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    console.log(error);
    return generateApiResponse(res, {
      data: null,
      message: "Failed to fetch chats",
      error: (error as Error).message || "INTERNAL_SERVER_ERROR",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
