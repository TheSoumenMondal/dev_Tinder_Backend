import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError.js";

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
