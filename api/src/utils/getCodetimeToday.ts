import dayjs from "dayjs";
import { db } from "../db";
import { and, eq, gte, lte, sum } from "drizzle-orm";
import { pulses, users } from "../db/schema";

export const GetCodeTimeToday = async (userId: string) => {
  try {
    const startOfToday = dayjs().startOf("day").toDate();
    const endOfToday = dayjs().endOf("day").toDate();

    const [record] = await db
      .select({
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, userId),
          gte(pulses.created_at, startOfToday),
          lte(pulses.created_at, endOfToday)
        )
      );

    return Number(record?.time || 0);
  } catch (error) {
    return 0;
  }
};
