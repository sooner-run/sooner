import { Context } from "hono";
import { db } from "../../db";
import { users } from "../../db/schema";
import { compareSync } from "bcryptjs";
import { eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { SetAuthToken } from "../../utils/setAuthToken";

export const Login = async (c: Context) => {
  const { email, password }: { email: string; password: string } =
    await c.req.json();
  try {
    if (!email || !password) {
      return c.json({ message: "Missing fields." }, 400);
    }

    const user = (
      await db.select().from(users).where(eq(users.email, email))
    ).flat()[0];

    if (!user) return c.json({ message: "Invalid email or password" }, 400);

    const isPasswordValid = compareSync(password, user.password!);

    if (!isPasswordValid)
      return c.json({ message: "Invalid email or password" }, 400);

    const token = sign({ id: user.id }, process.env.JWT_SECRET!);

    SetAuthToken(c, token);

    return c.json({ message: "Logged in" }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
