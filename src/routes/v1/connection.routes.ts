import express from "express";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { sendConnectionRequest } from "../../controllers/connection.controller.js";

const connectionRouter = express.Router();

connectionRouter.post("/interested", authenticateToken, sendConnectionRequest);

export default connectionRouter;
