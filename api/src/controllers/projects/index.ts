import { Context } from "hono";
import { db } from "../../db";
import { pulses } from "../../db/schema";
import { desc, eq, sum } from "drizzle-orm";
import { time_to_human } from "../../utils/time_to_human";

export const retrieve_projects = async (c: Context) => {
  try {
    const projects = await db
      .select({
        project: pulses.project,
        time: sum(pulses.time),
      })
      .from(pulses)
      .groupBy(pulses.project)
      .where(eq(pulses.user_id, c.get("user_id")));

    const [top_language] = await db
      .select({ language: pulses.language })
      .from(pulses)
      .where(eq(pulses.user_id, c.get("user_id")))
      .groupBy(pulses.language)
      .orderBy(desc(sum(pulses.time)))
      .limit(1);

    const _projects = projects.map((p) => ({
      ...p,
      top_language: top_language.language,
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
