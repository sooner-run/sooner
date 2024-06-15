import { Context } from "hono";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { SetAuthToken } from "../../utils/setAuthToken";

export const Verify = async (c: Context) => {
  const { otp }: { otp: string } = await c.req.json();
  try {
    if (!otp) {
      return c.json({ message: "OTP is required." }, 400);
    }

    const user = (
      await db.select().from(users).where(eq(users.otp, otp))
    ).flat()[0];

    if (!user) return c.json({ message: "Invalid OTP." }, 400);

    await db
      .update(users)
      .set({
        is_verified: true,
        otp: null,
        otp_expires_at: null,
      })
      .where(eq(users.id, user.id));

    const token = sign({ id: user.id }, process.env.JWT_SECRET!);

    SetAuthToken(c, token);

    return c.json({ message: "Verified" }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
