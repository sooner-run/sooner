import { Context } from "hono";
import { db } from "../db";
import { and, eq, gte, lte, sum, min } from "drizzle-orm";
import { pulses } from "../db/schema";
import dayjs from "dayjs";
import { time_to_human } from "../utils/time_to_human";
import { GetActivityChartData } from "./activityChartData";

export const Stats = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const [today] = await db
      .select({
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, userId),
          gte(pulses.created_at, dayjs().startOf("day").toDate()),
          lte(pulses.created_at, dayjs().endOf("day").toDate())
        )
      );

    const [thisWeek] = await db
      .select({
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, userId),
          gte(pulses.created_at, dayjs().startOf("week").toDate()),
          lte(pulses.created_at, dayjs().endOf("week").toDate())
        )
      );

    const [thisMonth] = await db
      .select({
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, userId),
          gte(pulses.created_at, dayjs().startOf("month").toDate()),
          lte(pulses.created_at, dayjs().endOf("month").toDate())
        )
      );

    const [allTime] = await db
      .select({
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(eq(pulses.user_id, userId));

    const [firstEntry] = await db
      .select({
        created_at: min(pulses.created_at),
      })
      .from(pulses)
      .where(eq(pulses.user_id, userId));

    const daysAllTime = dayjs().diff(dayjs(firstEntry.created_at), "day") + 1;

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

    const activity = await GetActivityChartData(userId);

    return c.json(
      {
        daily_average: time_to_human(Number(allTime.time) / daysAllTime),
        codetime: {
          Today: {
            time: time_to_human(Number(today.time)),
          },
          "This week": {
            time: time_to_human(Number(thisWeek.time)),
          },
          "This month": {
            time: time_to_human(Number(thisMonth.time)),
          },
          "All time": {
            time: time_to_human(Number(allTime.time)),
          },
        },
        streak: streak,
        activity,
      },
      200
    );
  } catch (error) {
    return c.json({ message: "Something went wrong." }, 500);
  }
};
