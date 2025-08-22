import { Response } from "express";
import { ApiResponse } from "../types/index.js";

export const generateApiResponse = <T>(
  res: Response,
  {
    data = null,
    message = "",
    statusCode = 200,
    error = null,
  }: {
    data?: T | null;
    message?: string;
    statusCode?: number;
    error?: string | null;
  } = {}
): ApiResponse<T> => {
  const response: ApiResponse<T> = {
    data,
    message,
    statusCode,
    error,
    success: statusCode >= 200 && statusCode < 300,
  };

  res.status(statusCode).json(response);
  return response;
};
