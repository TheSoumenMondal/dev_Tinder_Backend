import { Request, Response } from "express";
import UserService from "../services/user.service.js";
import UserRepository from "../repository/user.repository.js";
import { generateApiResponse } from "../utils/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import { JwtStrategy } from "../utils/jwt.js";
import { JwtPayload } from "jsonwebtoken";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export async function signUpUser(req: Request, res: Response) {
  const data = req.body;
  const user = await userService.signUpUser(data);
  return generateApiResponse(res, {
    data: user,
    error: null,
    message: "User signed up successfully",
    statusCode: 201,
  });
}

export async function getMyProfile(req: Request, res: Response) {
  const token = req.cookies?.token;
  const decodedData = JwtStrategy.verifyJwt(token) as JwtPayload;
  const user = await userService.getUserById(decodedData.userId);
  return generateApiResponse(res, {
    data: user,
    error: null,
    message: "User profile fetched successfully",
    statusCode: StatusCodes.OK,
  });
}

export async function getAllProfiles(req: Request, res: Response) {
  const token = req.cookies?.token;
  const decodedData = JwtStrategy.verifyJwt(token) as JwtPayload;
  const users = await userService.getAllProfiles(decodedData.userId);
  return generateApiResponse(res, {
    data: users,
    error: null,
    message: "All user profiles fetched successfully",
    statusCode: StatusCodes.OK,
  });
}


export async function updateUserProfile(req: Request, res: Response) {
  const token = req.cookies?.token;
  const decodedData = JwtStrategy.verifyJwt(token) as JwtPayload;
  const userId = decodedData.userId;
  const updatedData = req.body;
  console.log(updatedData);
  const user = await userService.updateUserProfile(userId, updatedData);
  return generateApiResponse(res, {
    data: user,
    error: null,
    message: "User profile updated successfully",
    statusCode: StatusCodes.OK,
  });
}