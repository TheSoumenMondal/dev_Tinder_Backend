import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError.js";

class VerificationError extends BaseError {
  constructor(payload: unknown) {
    super(
      `Unable to verify ${payload}`,
      StatusCodes.UNAUTHORIZED,
      "VerificationError"
    );
  }
}

export default VerificationError;
