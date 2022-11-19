import { createServer } from "http";
import { logger } from "../Components/logger";
import { env } from "../Utils/env";
import { app } from "../Components/express";

//create http server
export const httpServer = createServer(app);

//log that httpServer was created
logger.log("debug", "HTTP-Server created!");

//listen http server on port
httpServer.listen(env("APP_PORT", true, "3000"));

//create event listener to log when the server is listening
httpServer.on("listening", () => {
  logger.log(
    "info",
    `HttpServer listening on port ${env("APP_PORT", false, "3000")}!`,
  );
});
