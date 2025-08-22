import { StatusCodes } from "http-status-codes";
import app from "./app.js";
import serverConfig from "./config/serverConfig.js";
import { Response } from "express";
import connectDB from "./config/database.js";

app.get("/", (_, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is up and running",
    time: new Date().toISOString(),
  });
});

connectDB()
  .then(() => {
    return app.listen(serverConfig.PORT, () => {
      console.log(`Server is running on port ${serverConfig.PORT}`);
    });
  })
  .catch(() => {
    console.log("Server couldn't get started.");
  });
