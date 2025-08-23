import express from "express";
import { getAllProfiles, getMyProfile, signUpUser, updateUserProfile } from "../../controllers/user.controller.js";
import { logInUser, logOutUser } from "../../controllers/auth.controller.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/", signUpUser);
userRouter.post("/login", logInUser);
userRouter.post("/logout", logOutUser);
userRouter.get("/me", authenticateToken, getMyProfile);
userRouter.get("/all", authenticateToken, getAllProfiles);
userRouter.patch("/me", authenticateToken, updateUserProfile);

export default userRouter;
