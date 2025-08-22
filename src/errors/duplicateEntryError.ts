import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError.js";

export default class DuplicateEntryError extends BaseError {
  constructor(item: string) {
    super(
      `Duplicate entry found for ${item}`,
      StatusCodes.CONFLICT,
      "DuplicateEntryError"
    );
  }
}
