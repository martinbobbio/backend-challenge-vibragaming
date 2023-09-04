// Redis
import Redis, { RedisOptions } from "ioredis";
// Console colors
import chalk from "chalk";

// This is only for challenge purposes, credentials publics isn't important and it's for a simple getting started
// In real project this must be in configs vars for example .env
const redisOptions: RedisOptions = {
  password: process.env.BBDD_REDIS_PASS || "0sGvWZAgxKZ7huQMtbmnDT4VSnRc5rO7",
  host:
    process.env.BBDD_REDIS_HOST ||
    "redis-10754.c10.us-east-1-2.ec2.cloud.redislabs.com",
  port: 10754,
};

export const redis = new Redis(redisOptions);

redis.on("error", (error) => {
  console.error("Error de Redis:", error);
});

redis.on("connect", () =>
  console.log(chalk.greenBright(`BBDD Redis on ${process.env.BBDD_REDIS_HOST}`))
);
