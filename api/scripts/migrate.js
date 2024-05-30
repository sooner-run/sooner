const postgres = require("postgres");
const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
require("dotenv").config();

const client = postgres(process.env.DB_URL, { max: 1 });

const mg = async () => {
  await migrate(drizzle(client, { logger: true }), {
    migrationsFolder: "./src/drizzle",
  });
  await client.end();
};

mg();
