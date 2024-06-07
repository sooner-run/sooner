import { Context } from "hono";
import { db } from "../../db";
import { pulses } from "../../db/schema";
import { and, asc, desc, eq, max, sql, sum } from "drizzle-orm";
import { time_to_human } from "../../utils/time_to_human";

export const retrieve_single_project = async (c: Context) => {
  try {
    const project_name = c.req.param("project");

    const [project] = await db
      .select({
        total_time: sum(pulses.time),
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
          eq(pulses.project, project_name)
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
          eq(pulses.project, project_name)
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
          eq(pulses.project, project_name)
        )
      )
      .orderBy(desc(sum(pulses.time)))
      .groupBy(pulses.branch);

    return c.json(
      {
        name: project_name,
        time: Number(project.total_time),
        time_human_readable: time_to_human(Number(project.total_time)),
        top_language: languages[0].language,
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
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
