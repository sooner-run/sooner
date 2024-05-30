import { Context } from "hono";

export const api_key = async (c: Context) => {
  try {
    return c.json({ message: "API key gotten." }, 201);
  } catch (error) {
    return c.json({ message: "Something went wrong." }, 500);
  }
};
