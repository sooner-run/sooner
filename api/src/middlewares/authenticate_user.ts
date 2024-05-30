import { Context, MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

export const userAuthMiddleware: MiddlewareHandler = async (
  c: Context,
  next
) => {
  try {
    console.log(c);
    const auth_token = getCookie(c, "sooner.auth-token");

    if (!auth_token) {
      return c.json({ message: "Auth token is not present." }, 400);
    }

    console.log(auth_token);

    await next();
  } catch (error) {
    return c.json({ message: "Forbidden: Invalid token" }, 403);
  }
};
