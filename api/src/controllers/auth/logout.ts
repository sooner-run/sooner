import { Context } from "hono";
import { deleteCookie } from "hono/cookie";

export const Logout = (c: Context) => {
  try {
    deleteCookie(c, "sooner.auth-token");

    return c.json({ message: "Logged out" }, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong" }, 500);
  }
};
