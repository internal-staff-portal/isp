import { Logger } from "@laurenz1606/logger";
import { env } from "../Utils/env";

//create new Logger instance
export const logger = new Logger({
  format: "[%L] %t %m",
  debug: env("DEBUG", false, "") === "1",
  error: true,
  info: true,
  warn: true,
});
