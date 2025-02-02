import { createClient, RedisClientType } from "redis";

declare global {
  var redis: RedisClientType | undefined;
}

const redisClient =
  globalThis.redis ||
  createClient({
    username: "default",
    password: "password",
    socket: {
      connectTimeout: 5000,
      host: "localhost",
      port: 6379,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.redis = redisClient;
}

export default redisClient;
