import { Context } from "hono";
import { db } from "../../db";
import { pulses } from "../../db/schema";
import { eq, max, sum } from "drizzle-orm";
import { time_to_human } from "../../utils/time_to_human";

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

    const _projects = projects.map((p) => ({
      ...p,
      time: Number(p.time),
      time_human_readable: time_to_human(Number(p.time)),
      url: `/projects/${p.project}`,
    }));

    return c.json(_projects, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
