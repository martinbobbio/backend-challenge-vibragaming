// Express
import express from "express";
import bodyParser from "body-parser";
// Environment vars
import dotenv from "dotenv";
// Console colors
import chalk from "chalk";
// Routes
import timezoneRouter from "./routes/timezone/timezone";
// Middlewares
import {
  corsMiddleware,
  errorHandlerMiddleware,
  loggerMiddleware,
} from "./middlewares";
// Controllers
import { health } from "./controllers";

// Init
dotenv.config();
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(corsMiddleware);
app.use(loggerMiddleware);

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", health);
app.use("/", timezoneRouter);
app.use(errorHandlerMiddleware);

// App listener
app.listen(port, () => {
  console.log(chalk.whiteBright("The server has started successfully."));
  console.log(chalk.greenBright(`Server running on http://localhost:${port}`));
});
