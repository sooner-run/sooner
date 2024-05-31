import { Context } from "hono";
import { db } from "../../db";
import { pulses } from "../../db/schema";
import { eq, max, sum } from "drizzle-orm";

export const retrieve_projects = async (c: Context) => {
  try {
    const projects = await db
      .select({
        project: pulses.project,
        time: sum(pulses.time),
        top_language: max(pulses.language),
      })
      .from(pulses)
      .groupBy(pulses.project)
      .where(eq(pulses.user_id, c.get("user_id")));

    return c.json(projects, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
