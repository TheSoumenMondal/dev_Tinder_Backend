import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError.js";

export default class DuplicateEntryError extends BaseError {
  constructor(item: string) {
    const message = `Duplicate entry found for ${item}`;
    super(message);
    this.name = "DuplicateEntryError";
    this.statusCode = StatusCodes.CONFLICT;
  }
}
