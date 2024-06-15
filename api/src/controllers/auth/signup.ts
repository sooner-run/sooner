import { Context } from "hono";
import { validateEmail, validateUsername } from "../../utils/validators";
import { db } from "../../db";
import { users } from "../../db/schema";
import { generateAlphaNumeric } from "../../utils/generators";
import { hashSync } from "bcryptjs";
import dayjs from "dayjs";
import { logsnag } from "../../configs/logsnag";

export const Signup = async (c: Context) => {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = await c.req.json();
  try {
    if (!username || !email || !password) {
      return c.json({ message: "Missing fields." }, 400);
    }

    const usernameValidationError = await validateUsername(username);

    if (usernameValidationError) {
      return c.json({ message: usernameValidationError }, 400);
    }

    const emailValidationError = await validateEmail(email);

    if (emailValidationError) {
      return c.json({ message: emailValidationError }, 400);
    }

    if (password.length < 8) {
      return c.json({ message: "Password must be at least 8 characters." });
    }

    const otp = generateAlphaNumeric();

    const [newUser] = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashSync(password, 10),
        otp,
        otp_expires_at: dayjs().add(30, "minutes").toDate(),
        api_key: generateAlphaNumeric(69),
      })
      .returning();

    await logsnag.track({
      channel: "users",
      event: "New User",
      user_id: newUser.id,
      description: "2x 1TB SSD - Overnight Shipping",
      icon: "🔥",
      notify: true,
    });

    return c.json({ message: "User created." }, 201);
  } catch (error) {
    console.log(error);
    c.json({ message: "Something went wrong." }, 500);
  }
};
