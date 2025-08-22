import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JwtStrategy } from "../utils/jwt.js";
import ConnectionRepository from "../repository/connection.repository.js";
import ConnectionService from "../services/connection.service.js";
import { generateApiResponse } from "../utils/apiResponse.js";
import { StatusCodes } from "http-status-codes";

const connectionRepository = new ConnectionRepository();
const connectionService = new ConnectionService(connectionRepository);

export const sendConnectionRequest = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;
    const decodedData = JwtStrategy.verifyJwt(token) as JwtPayload;
    const senderId = decodedData.userId;
    const receiverId = req.body.receiverId;
    const connection = await connectionService.sendConnectionRequest(
      senderId,
      receiverId
    );
    return generateApiResponse(res, {
      data: connection,
      message: "Connection request sent successfully",
      error: null,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    return generateApiResponse(res, {
      data: null,
      message: `Error sending connection request: ${error}`,
      error: "Internal Server Error",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
