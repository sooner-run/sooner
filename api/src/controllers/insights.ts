import { Context } from "hono";
import { db } from "../db";
import { sql } from "drizzle-orm";
import { time_to_human } from "../utils/time_to_human";

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

    return c.json(averageTimesByDay);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Internal server error" }, 500);
  }
};
