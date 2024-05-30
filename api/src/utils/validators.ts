import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { isEmail } from "validator";

export const validateUsername = async (username: string) => {
  if (!username) {
    return "Username is required.";
  }

  const usernameRegex = /^[a-zA-Z0-9-]+$/;

  if (!usernameRegex.test(username)) {
    return "Username can only contain letters, numbers, and dashes.";
  }

  if (username.length < 4 || username.length > 20) {
    return "Username must be between 4 and 20 characters.";
  }

  if (username.startsWith("-")) {
    return "Username cannot start with a dash.";
  }

  if (username.endsWith("-")) {
    return "Username cannot end with a dash.";
  }

  if (username.includes("--")) {
    return "Username cannot contain two consecutive dashes.";
  }

  const user = (
    await db.select().from(users).where(eq(users.username, username))
  ).flat()[0];

  if (user) {
    return `${username} is already in use.`;
  }

  return null;
};

export const validateEmail = async (email: string) => {
  if (!email) {
    return "Email is required";
  }

  if (!isEmail(email)) {
    return "Email is invalid.";
  }

  const user = (
    await db
      .select()
      .from(users)
      .where(and(eq(users.email, email)))
  ).flat()[0];

  return user ? "Email is associated with an existing account." : null;
};
