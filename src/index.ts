import app from "@/app";
import config from "@/config";
import connectToDatabase from "@/config/dbConfig";
import { connectToRedis } from "@/config/cacheConfig";

app.listen(config.port, async () => {
  await connectToDatabase();
  await connectToRedis();
  console.log(`Server is running on http://localhost:${config.port}`);
});
