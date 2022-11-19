import { config as loadEnvs } from "dotenv";
import { logger } from "./Components/logger";
import { env } from "./Utils/env";

//load env vars
if (env("NODE_ENV") !== "production") {
  //load envs when not in production
  loadEnvs();

  //log that env vars were loaded
  logger.log(
    "info",
    `Loaded environment varibles from file(s) in ${env(
      "NODE_ENV",
    )} environment!`,
  );
}

//load all modules
import "./Modules/httpServer";
