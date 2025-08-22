import { NextFunction, Request, Response } from "express";
import { generateApiResponse } from "./apiResponse.js";
import { BaseError } from "../errors/baseError.js";
import { StatusCodes } from "http-status-codes";

export const ErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error.stack);
  if (error instanceof BaseError) {
    return generateApiResponse(res, {
      data: null,
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
    });
  } else {
    return generateApiResponse(res, {
      data: null,
      error: "Internal Server Error",
      message: "Something went wrong on server side.",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
