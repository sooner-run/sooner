import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export const db = drizzle(pool, { schema });
