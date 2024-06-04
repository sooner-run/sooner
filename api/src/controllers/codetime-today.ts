import { Context } from "hono";
import { and, eq, gte, lte } from "drizzle-orm";
import dayjs from "dayjs";
import { db } from "../db";
import { pulses } from "../db/schema";
import { time_to_human } from "../utils/time_to_human";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const timeZone = "Africa/Lagos";

export const codetime_today = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const startOfToday = dayjs().tz(timeZone).startOf("day").toDate();
    const endOfToday = dayjs().tz(timeZone).endOf("day").toDate();

    console.log({
      startOfToday: startOfToday.toISOString(),
      endOfToday: endOfToday.toISOString(),
    });

    const startOfTodayUTC = dayjs(startOfToday).utc().toDate();
    const endOfTodayUTC = dayjs(endOfToday).utc().toDate();

    const [record] = await db
      .select({
        time: pulses.time,
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
