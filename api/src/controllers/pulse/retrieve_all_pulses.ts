import { Context } from "hono";
import { db } from "../../db";
import { pulses } from "../../db/schema";
import { desc, eq } from "drizzle-orm";

export const retrieve_all_pulses = async (c: Context) => {
  try {
    const _pulses = await db
      .select()
      .from(pulses)
      .where(eq(pulses.user_id, c.get("user_id")))
      .orderBy(desc(pulses.created_at));

    return c.json({ pulses: _pulses }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
