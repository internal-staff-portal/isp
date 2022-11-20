import Redis from "ioredis";
import { env } from "../Utils/env";
import { logger } from "./logger";

//create the redis client
export const redisClient = new Redis(env("REDIS_URL", true) as string);

//listen to the connect event
redisClient.connect(() => {
  logger.log("info", "Connected to Redis instance!");
});
