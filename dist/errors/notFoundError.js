import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError.js";
export class NotFoundError extends BaseError {
    constructor({ resource }) {
        const msg = `${resource} not found`;
        super(msg);
        this.message = msg;
        this.statusCode = StatusCodes.NOT_FOUND;
        this.name = "NotFoundError";
    }
}
