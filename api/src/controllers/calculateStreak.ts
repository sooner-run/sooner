import { db } from "../db";
import { sql } from "drizzle-orm";
import { pulses } from "../db/schema";

export const CalculateStreak = async (userId: string): Promise<number> => {
  try {
    const query = sql`
      WITH distinct_pulse_dates AS (
        SELECT DISTINCT
          date_trunc('day', ${pulses.created_at}) AS pulse_date
        FROM ${pulses}
        WHERE ${pulses.user_id} = ${userId}
      ),
      consecutive_dates AS (
        SELECT
          pulse_date,
          pulse_date - INTERVAL '1 day' * ROW_NUMBER() OVER (ORDER BY pulse_date) AS streak_group
        FROM distinct_pulse_dates
      ),
      streak_groups AS (
        SELECT
          COUNT(*) AS streak_length,
          MIN(pulse_date) AS streak_start,
          MAX(pulse_date) AS streak_end
        FROM consecutive_dates
        GROUP BY streak_group
      )
      SELECT MAX(streak_length) AS streak_length
      FROM streak_groups;
    `;

    const result = await db.execute(query);
    const streak = Number(result.rows[0]?.streak_length || 0);

    return streak;
  } catch (error) {
    console.error("Error calculating streak:", error);
    return 0;
  }
};
