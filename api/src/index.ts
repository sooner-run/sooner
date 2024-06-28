import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { router as auth } from "./routes.auth";
import { router as app_routes } from "./routes.app";
import { router } from "./routes";
import env from "dotenv";
import { AuthMiddleware } from "./middlewares/authenticate";
import { AuthenticateAppUser } from "./middlewares/authenticateAppUser";
import { ActivateExtension } from "./controllers/extension/activate";

env.config();

const app = new Hono();

app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_DOMAIN!,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//*** Would come back to this when API access is shipped. ***/
// app.use("/v1/*", cors({ origin: "*" }));
// app.use(
//   "/auth/*",
//   cors({ origin: process.env.FRONTEND_DOMAIN!, credentials: true })
// );
// app.use(
//   "/app/*",
//   cors({ origin: process.env.FRONTEND_DOMAIN!, credentials: true })
// );
/******************************************************************/

app.get("/", (c) => {
  return c.json({ message: "Yoo, bitches!!!!" });
});

app.post("/v1/activate-extension", ActivateExtension);

app.use("/app/*", AuthenticateAppUser);
app.use("/v1/*", AuthMiddleware);

app.route("/v1", router);
app.route("/auth", auth);
app.route("/app", app_routes);

const port = 1716;
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
