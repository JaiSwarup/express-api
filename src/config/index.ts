import "dotenv/config";

const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
  nodeEnv: process.env.NODE_ENV || "development",
  dbUri: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
};

export default config;
