import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { router as auth } from "./routes.auth";
import { router } from "./routes";
import env from "dotenv";
import { authMiddleware } from "./middlewares/authenticate_api_key";

env.config();

const app = new Hono();

app.use("*", prettyJSON());
app.use("/*", cors());

app.get("/", (c) => {
  return c.json({ message: "Yoo, bitches!!!!" });
});

app.route("/auth", auth);

app.use("/pulse", authMiddleware);

app.route("/", router);

const port = 1716;
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
