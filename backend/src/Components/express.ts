import cors from "cors";
import express from "express";
import { ApiRouter } from "../Routers/ApiRouter";
import { env } from "../Utils/env";
import { logger } from "./logger";
import { auth } from "./auth";

//create new express instance
export const app = express();

//configure express app
app.use(express.json());
app.use(cors({ origin: env("APP_CORS", false, "*") }));

//use routers
app.use("/api", ApiRouter);
app.use("/auth", auth.Router);

//log that express app was created
logger.log("debug", "Express-App created!");
