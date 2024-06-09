import { Context } from "hono";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const ApiKey = async (c: Context) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, c.get("auth.user_id")));
    return c.json({ message: "API key retrieved", key: user.api_key }, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong." }, 500);
  }
};
