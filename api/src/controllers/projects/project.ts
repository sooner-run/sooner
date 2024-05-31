import { Context } from "hono";
import { db } from "../../db";
import { pulses } from "../../db/schema";
import { and, eq, max, sql } from "drizzle-orm";
import { time_to_human } from "../../utils/time_to_human";

export const retrieve_single_project = async (c: Context) => {
  try {
    const project_name = c.req.param("project");

    const [project] = await db
      .select({
        total_time: sql<number>`sum(${pulses.time})`.as("total_time"),
        project: pulses.project,
        language: max(pulses.language),
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
        time: sql<number>`sum(${pulses.time})`.as("time"),
      })
      .from(pulses)
      .where(
        and(
          eq(pulses.user_id, c.get("user_id")),
          eq(pulses.project, project_name)
        )
      )
      .groupBy(pulses.path);

    return c.json(
      {
        project: project_name,
        time: Number(project.total_time),
        time_human_readable: time_to_human(Number(project.total_time)),
        top_language: project.language,
        paths: path_records
          .map((record) => ({
            file: record.path?.split("/")[record.path.split("/").length - 1],
            path: record.path,
            time: Number(record.time),
            time_human_readable: time_to_human(Number(record.time)),
          }))
          .sort((a, b) => b.time - a.time),
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
