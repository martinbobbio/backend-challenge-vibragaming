// Express
import { NextFunction, Request, Response } from "express";
// Constants
import { TimezoneDetailData, apiWorldtime, redis } from "../../constants";

/**
 * Controller for retrieving timezones list from world time api.
 *
 * @function getTimezoneList
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express Next Function object.
 * @returns {Promise} Promise that resolves once the timezone list is retrieved.
 */
export const getTimezoneList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cachedResponse = JSON.parse(await redis.get("timezoneApi"));
    const data = !cachedResponse
      ? (await apiWorldtime.get<string[]>("/timezone")).data
      : cachedResponse;
    const current = await redis.smembers("clocks");
    const list = data.filter((element) => !current.includes(element));
    await redis.set("timezoneApi", JSON.stringify(data), "EX", 3600);
    res.status(200).json({ list, current });
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};

/**
 * Controller for retrieving timezone detail from world time api.
 *
 * @function getTimezoneDetail
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express Next Function object.
 * @returns {Promise<void>} Promise that resolves once the timezone detail is retrieved.
 */
export const getTimezoneDetail = async (
  req: Request,
  res: Response<TimezoneDetailData>,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    const { data } = await apiWorldtime.get<TimezoneDetailData>(
      `/timezone/${name}`
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};

/**
 * Controller for add timezone to the db.
 *
 * @function getTimezoneDetail
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express Next Function object.
 * @returns {Promise<void>} Promise that resolves once the timezone detail is retrieved.
 */
export const setTimezone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    await redis.sadd("clocks", name);
    res.status(200).json({ message: `${name} added to clocks.` });
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};

/**
 * Controller for delete timezone to the db.
 *
 * @function getTimezoneDetail
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express Next Function object.
 * @returns {Promise<void>} Promise that resolves once the timezone detail is retrieved.
 */
export const deleteTimezone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    await redis.srem("clocks", name);
    res.status(200).json({ message: `${name} deleted of clocks.` });
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};
