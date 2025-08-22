import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError.js";

class VerificationError extends BaseError{
    constructor(payload : unknown){
        super("Verification Error")
        this.name = "Verification Error",
        this.message = `Unable to verify ${payload}`,
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default VerificationError;