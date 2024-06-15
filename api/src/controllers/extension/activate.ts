import { Context } from "hono";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { GetCodeTimeToday } from "../../utils/getCodetimeToday";
export const ActivateExtension = async (c: Context) => {
  try {
    const { key }: { key: string } = await c.req.json();

    if (!key) return c.json({ message: "API Key is not provided" }, 400);

    const [_key] = await db.select().from(users).where(eq(users.api_key, key));

    if (!_key) return c.json({ message: "API Key is invalid" }, 400);

    await db
      .update(users)
      .set({
        is_extension_activated: true,
      })
      .where(eq(users.api_key, _key.api_key));

    return c.json(
      {
        message: "Extension is activated",
        codetime_today: await GetCodeTimeToday(_key.id),
      },
      200
    );
  } catch (error: any) {
    return c.json({ message: "Something went wrong." }, 500);
  }
};
