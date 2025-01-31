import client from "@/libs/prismaClient";
import config from ".";

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 1000;

const connectToDatabase = async () => {
  if (!config.dbUri) {
    throw new Error("Missing DATABASE_URI in config");
  }
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await client.$connect();

      console.log(`🗄️ [database]: Database Connected SUCCESSFULLY`);
      return;
    } catch (error) {
      console.error(`Database connection error (attempt ${i + 1}):`, error);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    }
  }

  throw new Error("Failed to connect to database after multiple retries.");
};

export default connectToDatabase;
