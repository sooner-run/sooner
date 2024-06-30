import { db } from "../db";
import { sql } from "drizzle-orm";
import { pulses } from "../db/schema";
import { time_to_human } from "../utils/time_to_human";

export async function CalculateWeekdayAverage(userId: string) {
  try {
    const query = sql`
      WITH weekday_totals AS (
        SELECT
          CASE
            WHEN EXTRACT(dow FROM ${pulses.created_at}) = 0 THEN 'Sunday'
            WHEN EXTRACT(dow FROM ${pulses.created_at}) = 1 THEN 'Monday'
            WHEN EXTRACT(dow FROM ${pulses.created_at}) = 2 THEN 'Tuesday'
            WHEN EXTRACT(dow FROM ${pulses.created_at}) = 3 THEN 'Wednesday'
            WHEN EXTRACT(dow FROM ${pulses.created_at}) = 4 THEN 'Thursday'
            WHEN EXTRACT(dow FROM ${pulses.created_at}) = 5 THEN 'Friday'
            WHEN EXTRACT(dow FROM ${pulses.created_at}) = 6 THEN 'Saturday'
          END AS day_of_week,
          SUM(${pulses.time}) AS total_time_seconds,
          COUNT(DISTINCT DATE(${pulses.created_at})) AS day_count
        FROM ${pulses}
        WHERE ${pulses.user_id} = ${userId}
        GROUP BY EXTRACT(dow FROM ${pulses.created_at})
      )
      SELECT
        day_of_week AS day,
        total_time_seconds / day_count AS average_time_seconds
      FROM weekday_totals
      ORDER BY
        CASE day_of_week
          WHEN 'Sunday' THEN 0
          WHEN 'Monday' THEN 1
          WHEN 'Tuesday' THEN 2
          WHEN 'Wednesday' THEN 3
          WHEN 'Thursday' THEN 4
          WHEN 'Friday' THEN 5
          WHEN 'Saturday' THEN 6
        END ASC;
    `;

    const result = await db.execute(query);

    // Format the result into the desired structure
    const weekday_average = result.rows.map((row) => {
      const averageTimeSeconds = Number(row.average_time_seconds);
      return {
        day: row.day,
        time: averageTimeSeconds.toString(),
        time_human_readable: time_to_human(averageTimeSeconds),
      };
    });

    return weekday_average;
  } catch (error) {
    console.error("Error calculating weekday average:", error);
    throw error;
  }
}
