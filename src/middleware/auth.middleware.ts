import { Request, Response, NextFunction } from "express";
import { JwtStrategy } from "../utils/jwt.js";
import { generateApiResponse } from "../utils/apiResponse.js";

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
        statusCode: 401,
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

    // Optional: Fetch user from database to ensure user still exists
    // const userRepository = new UserRepository();
    // const user = await userRepository.findById(decoded.userId);
    // if (!user) {
    //   return generateApiResponse(res, {
    //     statusCode: 401,
    //     message: "User not found",
    //     error: "Unauthorized"
    //   });
    // }

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
    // Continue without authentication for optional auth
    next();
  }
};
