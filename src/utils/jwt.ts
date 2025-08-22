import jwt from "jsonwebtoken";
import serverConfig from "../config/serverConfig.js";

export const JwtStrategy = {
  signJwt(payload: string | object | Buffer) {
    try {
      return jwt.sign(payload, serverConfig.JWT_SECRET!, {
        algorithm: "HS256",
        expiresIn: "5d",
      });
    } catch (error) {
      console.error("JWT signing error:", error);
      return null;
    }
  },

  verifyJwt(token: string) {
    try {
      return jwt.verify(token, serverConfig.JWT_SECRET!);
    } catch (error) {
      console.error("JWT verification error:", error);
      return null;
    }
  },
};
