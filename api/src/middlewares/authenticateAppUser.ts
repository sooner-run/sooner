import { Context, MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "jsonwebtoken";

export const AuthenticateAppUser: MiddlewareHandler = async (
  c: Context,
  next
) => {
  try {
    const auth_token = getCookie(c, "sooner.auth-token");

    if (!auth_token) {
      return c.json({ message: "Auth token is not present." }, 400);
    }

    const decoded = verify(auth_token, process.env.JWT_SECRET!) as {
      id: string;
    };

    c.set("auth.user_id", decoded.id);

    await next();
  } catch (error) {
    return c.json({ message: "Forbidden: Invalid token" }, 403);
  }
};
