import { Context } from "hono";
import { pulses } from "../../db/schema";
import { db } from "../../db";

export const create_pulse = async (c: Context) => {
  try {
    const user_id = c.get("user_id");
    const body = await c.req.json();

    console.log(body);

    await db.insert(pulses).values({
      user_id,
      ...body,
      path: body.path.replaceAll("\\", "/"),
    });
    return c.json({ message: "Pulse created." }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
