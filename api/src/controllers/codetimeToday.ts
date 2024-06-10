import { Context } from "hono";
import { and, eq, gte, lte, sum } from "drizzle-orm";
import dayjs from "dayjs";
import { db } from "../db";
import { pulses } from "../db/schema";
import { time_to_human } from "../utils/time_to_human";

export const CodetimeToday = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const startOfToday = dayjs().startOf("day").toDate();
    const endOfToday = dayjs().endOf("day").toDate();

    const startOfTodayUTC = dayjs(startOfToday).utc().toDate();
    const endOfTodayUTC = dayjs(endOfToday).utc().toDate();

    const [record] = await db
      .select({
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, userId),
          gte(pulses.created_at, startOfTodayUTC),
          lte(pulses.created_at, endOfTodayUTC)
        )
      );

    const totalCodingTime = record?.time || 0;

    return c.json(
      {
        time: Number(totalCodingTime),
        time_human_readable: time_to_human(Number(totalCodingTime)),
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
