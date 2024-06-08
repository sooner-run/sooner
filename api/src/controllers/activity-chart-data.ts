import { Context } from "hono";
import { db } from "../db";
import { eq, and, gte, lte, sum } from "drizzle-orm";
import { pulses } from "../db/schema";
import dayjs from "dayjs";

export const get_activity_chart_data = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const startDate = dayjs().startOf("year").toDate();
    const endDate = dayjs().endOf("year").toDate();

    const pulseData = await db
      .select({
        date: pulses.created_at,
        count: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, userId),
          gte(pulses.created_at, startDate),
          lte(pulses.created_at, endDate)
        )
      )
      .groupBy(pulses.created_at);

    const pulseMap = new Map();
    pulseData.forEach((item) => {
      pulseMap.set(item.date?.toISOString().split("T")[0], Number(item.count));
    });

    const result = [];
    let currentDate = dayjs(startDate);
    const end = dayjs(endDate);

    while (currentDate.isBefore(end) || currentDate.isSame(end, "day")) {
      const dateStr = currentDate.format("YYYY-MM-DD");
      result.push({
        date: dateStr,
        count: pulseMap.get(dateStr) || 0,
      });
      currentDate = currentDate.add(1, "day");
    }
    return result;
  } catch {
    return null;
  }
};
