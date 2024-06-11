import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const client = new Client(process.env.DB_URL);

client.connect(function (err) {
  if (err) console.log(err);
  else console.log("Connected!");
});

export const db = drizzle(client, { schema });
