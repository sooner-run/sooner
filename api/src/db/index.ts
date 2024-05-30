import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import env from "dotenv";

env.config();

const client = new Client({
  connectionString: process.env.DB_URL,
});

const ConnectClient = async () => {
  await client
    .connect()
    .then(() => {
      console.log("DB Connected!");
    })
    .catch(() => {
      console.log("Fialed to connect.");
      console.log(process.env.DB_URL);
    });
};

ConnectClient();

export const db = drizzle(client);
