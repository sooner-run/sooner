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

interface AverageTimesByDay {
  day: string;
  time: number;
  time_human_readable: string;
}

export async function CalculateWeekdayAverage(userId: string) {
  const averageTimesByDay: AverageTimesByDay[] = dayNames.map((day) => ({
    day,
    time: 0,
    time_human_readable: time_to_human(0),
  }));

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
    averageTimesByDay[dayOfWeek] = {
      day: dayNames[dayOfWeek],
      time: Number(row.average_time),
      time_human_readable: time_to_human(Number(row.average_time)),
    };
  });

  return averageTimesByDay;
}
