import { Context } from "hono";

export const stats = async (c: Context) => {
  return c.json({ streak: "200" }, 200);
};
