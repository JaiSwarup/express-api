const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
