import Auth, { IConfig } from "@authfunctions/express";
import { UserModel } from "../Models/UserModel";
import { env } from "../Utils/env";
import { logger } from "./logger";
import { redisClient } from "./redis";

//create new auth instance
export const auth = new Auth({
  accessTokenSecret: env("AUTH_ACCESS_TOKEN_SECRET", true) as string,
  refreshTokenSecret: env("AUTH_ACCESS_TOKEN_SECRET", true) as string,
  emailValidation: Boolean(Number(env("AUTH_VALIDATE_EMAIL", false, "1"))),
  expiresIn: Number(env("AUTH_EXPIRES_IN", false, "900")),
  passwordValidation: env(
    "AUTH_PASSWORD_RULE",
    false,
    "Y-Y-Y-Y-8",
  ) as IConfig["passwordValidation"],
});

//set the auth logger
auth.logger((level, message) => logger.log(level, message));

//get user by mail auth event
auth.use("getUserByMail", async ({ email }) => {
  try {
    //get user from database
    const user = await UserModel.findOne({ email: email });

    //check if user exists
    if (!user) return [false, null];

    //return no error and user data
    return [
      false,
      {
        email: user.email,
        hashedPassword: user.hashedPassword,
        id: user._id,
        username: user.handle,
      },
    ];
  } catch (err) {
    //log catched error
    logger.log("error", String(err));

    //return error
    return [true, null];
  }
});

//get user by name auth event
auth.use("getUserByName", async ({ username }) => {
  try {
    //get user from database
    const user = await UserModel.findOne({ handle: username });

    //check if user exists
    if (!user) return [false, null];

    //return no error and user data
    return [
      false,
      {
        email: user.email,
        hashedPassword: user.hashedPassword,
        id: user._id,
        username: user.handle,
      },
    ];
  } catch (err) {
    //log catched error
    logger.log("error", String(err));

    //return error
    return [true, null];
  }
});

//check user token auth event
auth.use("checkToken", async ({ token }) => {
  try {
    //check if token is stored
    const isStored = await redisClient.sismember("AUTH_REFRESH_TOKENS", token);

    //return result of storecheck
    return [false, Boolean(isStored)];
  } catch (err) {
    //log catched error
    logger.log("error", String(err));

    //return error
    return [true, null];
  }
});

//store user token auth event
auth.use("storeToken", async ({ token }) => {
  try {
    //store token
    await redisClient.sadd("AUTH_REFRESH_TOKENS", token);

    //return no error
    return [false];
  } catch (err) {
    //log catched error
    logger.log("error", String(err));

    //return error
    return [true];
  }
});

//delete user token auth event
auth.use("deleteToken", async ({ token }) => {
  try {
    //remove token
    await redisClient.srem("AUTH_REFRESH_TOKENS", token);

    //return no error
    return [false];
  } catch (err) {
    //log catched error
    logger.log("error", String(err));

    //return error
    return [true];
  }
});

//intercept user login
auth.intercept("login", async ({ id }) => {
  try {
    //get user from database
    const user = await UserModel.findById(id);

    //accept login when user is active
    if (user?.active) return [false];
    //else (user is inactive) forbid login
    else return [true];
  } catch (err) {
    //log catched error
    logger.log("error", String(err));

    //forbid login
    return [true];
  }
});
