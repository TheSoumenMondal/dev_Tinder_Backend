import express from "express";
import { signUpUser } from "../../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/", signUpUser);

export default userRouter;
