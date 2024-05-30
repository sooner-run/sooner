import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { router as auth } from "./routes.auth";
import env from "dotenv";

env.config();

const app = new Hono();

app.use("*", prettyJSON());
app.use("/*", cors());

app.get("/", (c) => {
  return c.json({ message: "Yoo, bitches!!!!" });
});

app.route("/auth", auth);

const port = 1716;
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

/**
 * 
 * path: getFilePath(),
          time: totalCodingTime,
          branch: await getCurrentBranch(getProjectPath()!),
          project: vscode.workspace.name || null,
          language: vscode.window.activeTextEditor?.document.languageId || null,
          os: os.type(),
          hostname: os.hostname(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
 */
