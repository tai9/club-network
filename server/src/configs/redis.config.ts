import Redis from "ioredis";

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: +process.env.REDIS_PORT || 6379,
  username: process.env.REDIS_USERNAME || "default",
  password: process.env.REDIS_PASSWORD || "",
  keyPrefix: process.env.APP_NAME,
});

redisClient.on("connect", () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Redis client connected");
  }
});

redisClient.on("error", (error) => {
  console.error(`Unhandled Exception: ${error}.`);
});
