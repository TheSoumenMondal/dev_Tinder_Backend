import express from "express";
import userRouter from "./user.routes.js";
import connectionRouter from "./connection.routes.js";
import chatRoute from "./chat.route.js";

const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/connections", connectionRouter);
v1Router.use("/chats", chatRoute);

export default v1Router;
