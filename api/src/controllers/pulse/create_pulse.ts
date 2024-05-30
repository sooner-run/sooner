import { Context } from "hono";
import { pulses } from "../../db/schema";
import { db } from "../../db";

export const create_pulse = async (c: Context) => {
  try {
    const user_id = c.get("user_id");
    // const body = await c.req.json();
    // await db.insert(pulses).values({
    //   ...body,
    // });
    return c.json({ message: "Pulse created.", user_id }, 201);
  } catch (error) {
    return c.json({ message: "Something went wrong." }, 500);
  }
};
