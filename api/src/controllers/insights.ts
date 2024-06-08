import { Context } from "hono";
import { db } from "../db";
import { desc, eq, sql, sum } from "drizzle-orm";
import { time_to_human } from "../utils/time_to_human";
import { pulses } from "../db/schema";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const insights = async (c: Context) => {
  try {
    const userId = c.get("user_id");
    const averageTimesByDay = dayNames.reduce((acc, day, index) => {
      //@ts-ignore
      acc[index] = { day, time: 0, time_human_readable: time_to_human(0) };
      return acc;
    }, []);

    const result = await db.execute(sql`
      SELECT
        EXTRACT(DOW FROM "created_at") AS "day_of_week",
        AVG("time") AS "average_time"
      FROM
        "pulses"
      WHERE
        "user_id" = ${userId}
      GROUP BY
        "day_of_week"
      ORDER BY
        "day_of_week";
    `);

    result.rows.forEach((row) => {
      const dayOfWeek = Number(row.day_of_week);
      //@ts-expect-error
      averageTimesByDay[dayOfWeek] = {
        day: dayNames[dayOfWeek],
        time: Number(row.average_time),
        time_human_readable: time_to_human(Number(row.average_time)),
      };
    });

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
      weekday_average: averageTimesByDay,
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
