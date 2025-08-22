import express from "express";
import { signUpUser } from "../../controllers/user.controller.js";
import { logInUser, logOutUser } from "../../controllers/auth.controller.js";
const userRouter = express.Router();
userRouter.post("/", signUpUser);
userRouter.post("/login", logInUser);
userRouter.post("/logout", logOutUser);
export default userRouter;
