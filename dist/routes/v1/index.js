import express from "express";
import userRouter from "./user.routes.js";
import connectionRouter from "./connection.routes.js";
const v1Router = express.Router();
v1Router.use("/users", userRouter);
v1Router.use("/connections", connectionRouter);
export default v1Router;
