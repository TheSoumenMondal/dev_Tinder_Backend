import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/index.js";
import { ErrorHandler } from "./utils/errorHandler.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRouter);

//Called at last
app.use(ErrorHandler);

export default app;
