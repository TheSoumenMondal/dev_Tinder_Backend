import express from "express";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { getConnectionRequests, sendConnectionRequest, updateConnectionStatus } from "../../controllers/connection.controller.js";

const connectionRouter = express.Router();

connectionRouter.post("/send", authenticateToken, sendConnectionRequest);
connectionRouter.get("/requests", authenticateToken, getConnectionRequests);
connectionRouter.patch("/:status/:connectionId", authenticateToken, updateConnectionStatus);

export default connectionRouter;
