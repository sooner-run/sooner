import { Context } from "hono";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const Extenison = async (c: Context) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, c.get("auth.user_id")));
    return c.json({ activated: user.is_extension_activated }, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong." }, 500);
  }
};
