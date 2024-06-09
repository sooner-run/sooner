import { db } from "../db";
import { and, eq, gte, lte, sum } from "drizzle-orm";
import { pulses } from "../db/schema";
import dayjs from "dayjs";

export const CalculateStreak = async (userId: string): Promise<number> => {
  let streak = 0;
  let currentDay = dayjs().startOf("day");

  while (true) {
    const [dayPulse] = await db
      .select({
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, userId),
          gte(pulses.created_at, currentDay.toDate()),
          lte(pulses.created_at, currentDay.endOf("day").toDate())
        )
      );

    if (Number(dayPulse.time) > 0) {
      streak++;
      currentDay = currentDay.subtract(1, "day");
    } else {
      break;
    }
  }

  return streak;
};
