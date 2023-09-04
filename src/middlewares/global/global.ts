// Express
import { NextFunction, Request, Response } from "express";
// Console colors
import chalk from "chalk";
// Axios
import { AxiosError } from "axios";

/**
 * Middleware for cors logic
 *
 * @function corsMiddleware
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express Next Function object.
 */
export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};

/**
 * Middleware for log api requests
 *
 * @function loggerMiddleware
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express Next Function object.
 */
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.originalSend = res.send;

  console.log(chalk.blueBright("Request"));
  console.log(chalk.blueBright(`Method: ${req.method}`));
  console.log(chalk.blueBright(`Endpoint: ${req.url}`));
  res.send = function (...args: any[]): any {
    if (res.statusCode >= 400) {
      console.error(
        chalk.redBright(`Error Response [${res.statusCode}]: ${args[0]}`)
      );
    } else {
      console.log(chalk.blueBright(`Response: ${args[0]}`));
    }
    res.locals.originalSend.apply(res, args);
  };
  res.on("finish", () => {
    if (res.statusCode >= 400 && !res.headersSent) {
      console.error(
        chalk.redBright(
          `Error [${res.statusCode}] for ${req.method} ${req.url}`
        )
      );
    }
  });
  next();
};

/**
 * Middleware for handle api errors
 *
 * @function errorHandlerMiddleware
 * @param {error} error - For error Axios.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express Next Function object.
 */
export const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.message ||
      error?.message ||
      "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
