import { db } from "../db";
import { eq, and, gte, lte, sql } from "drizzle-orm";
import { pulses } from "../db/schema";
import dayjs from "dayjs";

export const GetActivityChartData = async (userId: string) => {
  try {
    const startDate = dayjs().startOf("year").toDate();
    const endDate = dayjs().endOf("year").toDate();

    type PulseData = {
      date: string;
      count: number;
    };

    const pulseData: PulseData[] = await db
      .select({
        date: sql<string>`DATE_TRUNC('day', ${pulses.created_at})::date`.as(
          "date"
        ),
        count: sql<number>`SUM(${pulses.time})`.as("count"),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, userId),
          gte(pulses.created_at, startDate),
          lte(pulses.created_at, endDate)
        )
      )
      .groupBy(sql`DATE_TRUNC('day', ${pulses.created_at})`);

    const pulseMap = new Map<string, number>();
    pulseData.forEach((item) => {
      pulseMap.set(item.date.split("T")[0], Number(item.count));
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
  } catch (error) {
    console.error("Error fetching activity chart data:", error);
    return null;
  }
};
