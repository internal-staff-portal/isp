import mongoose from "mongoose";
import { logger } from "../Components/logger";
import { env } from "../Utils/env";

//connect to the database
mongoose.connect(env("MONGO_URL", true) as string, () => {
  logger.log("info", "Connected to MongoDB instance!");
});
