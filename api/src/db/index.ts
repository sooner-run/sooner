import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import env from "dotenv";

env.config();

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

const client = new Client({
  connectionString: process.env.DB_URL,
});

const connectWithRetry = async (retries = 0) => {
  try {
    await client.connect();
    console.log("DB Connected!");
  } catch (error) {
    console.error("Failed to connect:", error);

    if (retries < MAX_RETRIES) {
      console.log(`Retrying to connect... (${retries + 1}/${MAX_RETRIES})`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
      await connectWithRetry(retries + 1);
    } else {
      console.error("Max retries reached. Could not connect to the database.");
    }
  }
};

const initializeDb = async () => {
  if (!process.env.DB_URL) {
    console.error("DB_URL is not defined in environment variables");
    process.exit(1);
  }

  await connectWithRetry();
};

initializeDb();

export const db = drizzle(client);
