const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: "password",
  socket: {
    connectTimeout: 5000,
    host: "localhost",
    port: 6379,
  },
});
async function connectToRedis() {
  redisClient.on("error", (err) => {
    if (err.name === "ConnectionTimeoutError") {
      console.error(
        "Redis connection timeout. Check your Redis URL and network connectivity."
      );
    } else {
      console.error("Redis connection error:", err);
    }
  });
  redisClient.on("connect", () => {
    console.log("🚀 [redis]: Redis connected");
  });
  await redisClient.connect();
}

connectToRedis()
  .then(async () => {
    console.log(await redisClient.get("name"));
  })
  .catch((err) => {
    console.error("Failed to establish Redis connection:", err);
  });

process.on("SIGINT", async () => {
  console.log("Closing Redis connection");
  await redisClient.quit();
  process.exit(0);
});
