import { Context, MiddlewareHandler } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const authMiddleware: MiddlewareHandler = async (c: Context, next) => {
  const authHeader = c.req.raw.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized: No token provided" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.api_key, token));

    if (!user) {
      return c.json({ message: "Invalid API key" });
    }

    c.set("user_id", user.id);

    await next();
  } catch (err) {
    return c.json({ message: "Forbidden: Invalid token" }, 403);
  }
};
