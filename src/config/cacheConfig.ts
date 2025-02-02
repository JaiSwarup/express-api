import config from ".";
import redisClient from "@/libs/redisClient";

export async function connectToRedis() {
  try {
    // if (!config.redisUrl) {
    //   console.warn(
    //     "Warning: Redis URL not configured. Redis will not be used."
    //   );
    //   return;
    // }

    redisClient.on("error", (err: Error) => {
      if (err.name === "ConnectionTimeoutError") {
        console.error(
          "Redis connection timeout. Check your Redis URL and network connectivity."
        );
      } else {
        console.error("Redis connection error:", err);
      }
    });

    redisClient.on("connect", () => {
      //   logger.info("🚀 [redis]: Redis connected");
      console.log("🚀 [redis]: Redis connected");
    });

    await redisClient.connect();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "InvalidURIError") {
        console.error("Invalid Redis URL:", error.message);
      } else {
        console.error("Error connecting to Redis:", error.message);
      }
    } else {
      console.error("Unexpected error connecting to Redis:", error);
    }
  }
}
