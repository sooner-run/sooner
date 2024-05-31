import { Context, MiddlewareHandler } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { getCookie } from "hono/cookie";
import { verify } from "jsonwebtoken";

export const authMiddleware: MiddlewareHandler = async (c: Context, next) => {
  try {
    const authHeader = c.req.raw.headers.get("Authorization");
    const auth_token = getCookie(c, "sooner.auth-token");

    if (!authHeader && !auth_token) {
      return c.json({ message: "Unauthorized: No token provided" }, 401);
    }

    const token = authHeader?.split(" ")[1];
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.api_key, token!));

    if (token && !user) {
      return c.json({ message: "Invalid API key" });
    }

    let decoded;

    if (!authHeader) {
      decoded = verify(auth_token!, process.env.JWT_SECRET!) as {
        id: string;
      };
    }

    c.set("user_id", user?.id || decoded?.id);
    await next();
  } catch (err) {
    console.log(err);
    return c.json({ message: "Forbidden: Invalid token" }, 403);
  }
};
