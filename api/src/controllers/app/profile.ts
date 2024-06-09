import { Context } from "hono";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const Profile = async (c: Context) => {
  try {
    const [user] = await db
      .select({
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, c.get("auth.user_id")));
    return c.json(user, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong." }, 500);
  }
};
