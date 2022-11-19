import express from "express";
import { ApiRouter } from "../Routers/ApiRouter";
import { logger } from "./logger";

//create new express instance
export const app = express();

//use routers
app.use("/api", ApiRouter);

//log that express app was created
logger.log("debug", "Express-App created!");
