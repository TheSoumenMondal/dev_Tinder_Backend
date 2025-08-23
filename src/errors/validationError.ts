import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError.js";

class ValidationError extends BaseError {
  constructor(resource: string) {
    super(`${resource} is invalid.`);
    this.name = "ValidationError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default ValidationError;
