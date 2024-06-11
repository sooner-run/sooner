import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import env from "dotenv";

env.config();

const client = new Client({
  connectionString: process.env.DB_URL,
});

client.connect(function (err) {
  if (err) console.log(err);
  else console.log("Connected!");
});

export const db = drizzle(client);
