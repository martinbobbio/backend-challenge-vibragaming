import axios from "axios";

export const apiWorldtime = axios.create({
  baseURL: process.env.API_URL_COINGECKO || "http://worldtimeapi.org/api",
});
