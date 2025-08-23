import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JwtStrategy } from "../utils/jwt.js";
import ConnectionRepository from "../repository/connection.repository.js";
import ConnectionService from "../services/connection.service.js";
import { generateApiResponse } from "../utils/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import { connectionType } from "../types/index.js";

const connectionRepository = new ConnectionRepository();
const connectionService = new ConnectionService(connectionRepository);

export const sendConnectionRequest = async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  const decodedData = JwtStrategy.verifyJwt(token) as JwtPayload;
  const senderId = decodedData.userId;
  const receiverId = req.body.receiverId;
  const connectionStatus = req.body.status;
  const connection = await connectionService.sendConnectionRequest(
    senderId,
    receiverId,
    connectionStatus
  );
  return generateApiResponse(res, {
    data: connection,
    message: "Connection request sent successfully",
    error: null,
    statusCode: StatusCodes.OK,
  });
};

export const updateConnectionStatus = async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  const decoded = JwtStrategy.verifyJwt(token) as JwtPayload;
  const currentUserId = decoded.userId;
  const status = req.params.status as Partial<connectionType>;
  const connectionId = req.params.connectionId;
  const updatedConnection = await connectionService.updateConnectionStatus(
    currentUserId,
    status,
    connectionId
  );
  return generateApiResponse(res, {
    data: updatedConnection,
    message: `Successfully ${status} the connection request.`,
    error: null,
    statusCode: StatusCodes.OK,
  });
};
