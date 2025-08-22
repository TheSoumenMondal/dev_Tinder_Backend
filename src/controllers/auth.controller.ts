import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";
import UserRepository from "../repository/user.repository.js";
import { generateApiResponse } from "../utils/apiResponse.js";
import { BaseError } from "../errors/baseError.js";
import { StatusCodes } from "http-status-codes";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export const logInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return generateApiResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "Email and password are required",
        error: "Missing credentials",
      });
    }

    const { sanitizedUser, verificationToken } = await authService.LogInUser(
      email,
      password
    );

    res.cookie("token", verificationToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    return generateApiResponse(res, {
      statusCode: 200,
      message: "Login successful",
      data: sanitizedUser,
    });
  } catch (error) {
    if (error instanceof BaseError) {
      return generateApiResponse(res, {
        statusCode: error.statusCode || StatusCodes.BAD_REQUEST,
        message: error.message,
        error: "Authentication failed",
      });
    }
    return generateApiResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      error: "Login failed",
    });
  }
};

export const logOutUser = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return generateApiResponse(res, {
      statusCode: 200,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return generateApiResponse(res, {
      statusCode: 500,
      message: "Internal server error",
      error: "Logout failed",
    });
  }
};
