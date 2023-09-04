// Express
import { NextFunction, Request, Response } from "express";
// Package JSON
import packageJSON from "../../../package.json";

/**
 * Controller for health and index
 *
 * @function health
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 */
export const health = (req: Request, res: Response) => {
  res.status(200).json({
    version: packageJSON.version,
    name: packageJSON.name,
    message: "The server is running",
    health: true,
  });
};
