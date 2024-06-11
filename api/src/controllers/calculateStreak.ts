import { db } from "../db";
import { and, eq, gte, lte, sum } from "drizzle-orm";
import { pulses } from "../db/schema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const timeZone = "Africa/Lagos";

export const CalculateStreak = async (userId: string): Promise<number> => {
  try {
    let streak = 0;
    let currentDay = dayjs().tz(timeZone).startOf("day");

    while (true) {
      const startOfDay = currentDay
        .startOf("day")
        .add(1, "hour")
        .tz(timeZone, true)
        .toDate();
      const endOfDay = currentDay
        .endOf("day")
        .add(1, "hour")
        .tz(timeZone, true)
        .toDate();

      const [dayPulse] = await db
        .select({
          time: sum(pulses.time),
        })
        .from(pulses)
        .where(
          and(
            eq(pulses.user_id, userId),
            gte(pulses.created_at, startOfDay),
            lte(pulses.created_at, endOfDay)
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
  } catch (error) {
    console.error("Error calculating streak:", error);
    return 0;
  }
};
