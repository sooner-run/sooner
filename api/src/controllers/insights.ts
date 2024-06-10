import { Context } from "hono";
import { db } from "../db";
import { desc, eq, sum } from "drizzle-orm";
import { time_to_human } from "../utils/time_to_human";
import { pulses } from "../db/schema";
import { CalculateWeekdayAverage } from "./weekdayAverage";

export const Insights = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const weekdayAverage = await CalculateWeekdayAverage(userId);

    const top_languages = await db
      .select({
        language: pulses.language,
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(eq(pulses.user_id, c.get("user_id")))
      .groupBy(pulses.language)
      .orderBy(desc(sum(pulses.time)));

    const top_projects = await db
      .select({
        project: pulses.project,
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(eq(pulses.user_id, c.get("user_id")))
      .groupBy(pulses.project)
      .orderBy(desc(sum(pulses.time)));

    return c.json({
      weekday_average: weekdayAverage,
      top_languages: top_languages.map((l) => ({
        language: l.language,
        time: Number(l.time),
        time_human_readable: time_to_human(Number(l.time)),
      })),

      top_projects: top_projects.map((p) => ({
        project: p.project,
        time: Number(p.time),
        time_human_readable: time_to_human(Number(p.time)),
      })),
    });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Internal server error" }, 500);
  }
};
