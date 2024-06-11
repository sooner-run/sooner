import { Context } from "hono";
import { db } from "../../db";
import { pulses } from "../../db/schema";
import { and, desc, eq, sum, gte, lte, sql } from "drizzle-orm";
import { time_to_human } from "../../utils/time_to_human";
import dayjs from "dayjs";

export const RetrieveSingleProject = async (c: Context) => {
  try {
    const project_name = c.req.param("project");
    const start_date =
      new Date(c.req.query("start_date")!) ||
      dayjs().subtract(6, "days").toDate();
    const end_date = new Date(c.req.query("end_date")!) || dayjs().toDate();

    const projectLastXDays = await db
      .select({
        date: sql`DATE(pulses.created_at)`,
        total_time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, c.get("user_id")),
          eq(pulses.project, project_name),
          gte(pulses.created_at, start_date),
          lte(pulses.created_at, end_date)
        )
      )
      .groupBy(sql`DATE(pulses.created_at)`)
      .orderBy(sql`DATE(pulses.created_at)`);

    const [projectTotal] = await db
      .select({
        total_time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, c.get("user_id")),
          eq(pulses.project, project_name)
        )
      );

    const [project] = await db
      .select({
        project: pulses.project,
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, c.get("user_id")),
          eq(pulses.project, project_name)
        )
      )
      .groupBy(pulses.project);

    if (!project) {
      return c.json({ message: "Project not found" }, 404);
    }

    const path_records = await db
      .select({
        path: pulses.path,
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, c.get("user_id")),
          eq(pulses.project, project_name),
          gte(pulses.created_at, start_date),
          lte(pulses.created_at, end_date)
        )
      )
      .groupBy(pulses.path)
      .orderBy(desc(sum(pulses.time)));

    const languages = await db
      .select({
        language: pulses.language,
        time: sum(pulses.time),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, c.get("user_id")),
          eq(pulses.project, project_name),
          gte(pulses.created_at, start_date),
          lte(pulses.created_at, end_date)
        )
      )
      .orderBy(desc(sum(pulses.time)))
      .groupBy(pulses.language);

    const branches = await db
      .select({ branch: pulses.branch, time: sum(pulses.time) })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, c.get("user_id")),
          eq(pulses.project, project_name),
          gte(pulses.created_at, start_date),
          lte(pulses.created_at, end_date)
        )
      )
      .orderBy(desc(sum(pulses.time)))
      .groupBy(pulses.branch);

    const generateDateRange = (startDate: Date, endDate: Date) => {
      const dates = [];
      let currentDate = dayjs(startDate);
      const lastDate = dayjs(endDate);

      while (
        currentDate.isBefore(lastDate) ||
        currentDate.isSame(lastDate, "day")
      ) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }

      return dates;
    };

    const completeDates = generateDateRange(start_date, end_date);
    const timeseries = completeDates.map((date) => {
      const record = projectLastXDays.find((record) => record.date === date);
      return {
        date,
        time: record ? Number(record.total_time) : 0,
      };
    });

    return c.json(
      {
        time: projectLastXDays.reduce(
          (acc, curr) => acc + Number(curr.total_time),
          0
        ),
        time_human_readable: time_to_human(
          projectLastXDays.reduce(
            (acc, curr) => acc + Number(curr.total_time),
            0
          )
        ),
        top_language: languages[0]?.language || "N/A",
        all_time: time_to_human(Number(projectTotal.total_time)),
        files: path_records.map((record) => ({
          file: record.path?.split("/")[record.path.split("/").length - 1],
          path: record.path,
          time: Number(record.time),
          time_human_readable: time_to_human(Number(record.time)),
        })),
        languages: languages.map((l) => ({
          language: l.language,
          time: Number(l.time),
          time_human_readable: time_to_human(Number(l.time)),
        })),
        branches: branches.map((b) => ({
          branch: b.branch,
          time: Number(b.time),
          time_human_readable: time_to_human(Number(b.time)),
        })),
        timeseries,
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
