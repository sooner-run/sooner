import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { router as auth } from "./routes.auth";
import { router as app_routes } from "./routes.app";
import { router } from "./routes";
import env from "dotenv";
import { authMiddleware } from "./middlewares/authenticate";
import { userAuthMiddleware } from "./middlewares/authenticate_app_user";

env.config();

const app = new Hono();

app.use("*", prettyJSON());
app.use("/*", cors({ origin: "*" }));

app.get("/", (c) => {
  return c.json({ message: "Yoo, bitches!!!!" });
});

app.use("/app/*", userAuthMiddleware);
app.use("/v1/*", authMiddleware);

app.route("/v1", router);
app.route("/auth", auth);
app.route("/app", app_routes);

const port = 1716;
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
