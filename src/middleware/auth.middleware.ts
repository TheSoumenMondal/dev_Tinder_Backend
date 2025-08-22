import { Request, Response, NextFunction } from "express";
import { JwtStrategy } from "../utils/jwt.js";
import { generateApiResponse } from "../utils/apiResponse.js";
import { StatusCodes } from "http-status-codes";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return generateApiResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "Access token required",
        error: "Unauthorized",
      });
    }

    const decoded = JwtStrategy.verifyJwt(token);

    if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
      return generateApiResponse(res, {
        statusCode: 401,
        message: "Invalid or expired token",
        error: "Unauthorized",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return generateApiResponse(res, {
      statusCode: 401,
      message: "Authentication failed",
      error: "Unauthorized",
    });
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (token) {
      const decoded = JwtStrategy.verifyJwt(token);
      if (decoded && typeof decoded === "object" && "userId" in decoded) {
        req.user = decoded;
      }
    }

    next();
  } catch (error) {
    next();
  }
};
