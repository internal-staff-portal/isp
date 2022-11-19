import { logger } from "../Components/logger";

//shorthand function for loading env vars with optional fallback when var is undefined and process exiting when required var is undefined
export function env(
  name: string,
  required: boolean = false,
  fallback?: string,
) {
  //check if required var is set
  if (required && process.env[name] === undefined) {
    //log warning that required var is not set
    logger.log(
      "warn",
      `Environment variable "${name}" is required and not explicitly set!`,
    );

    //check for fallback
    if (fallback === undefined) {
      //log error that required var is not set and also has no fallback
      logger.log(
        "error",
        `Environment variable "${name}" is required, not explicitly set and has no fallback. Exiting process!`,
      );

      //exit process
      process.exit(1);
    }
  }

  return process.env[name] ?? fallback;
}
