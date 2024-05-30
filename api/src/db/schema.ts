import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique(),
  password: text("password"),
  avatar: text("avatar"),
  bio: text("bio"),
  github: text("github"),
  twitter: text("twitter"),
  website: text("website"),
  email: text("email").notNull().unique(),
  api_key: text("api_key").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  otp: text("otp"),
  otp_expires_at: timestamp("otp_expires_at"),
  display_name: text("display_name"),
  is_profile_public: boolean("is_profile_public").default(false),
  display_codetime_publicly: boolean("display_codetime_publicly").default(
    false
  ),
});

export const pulses = pgTable("pulses", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").references(() => users.id),
  time: integer("time").notNull(),
  project: text("project").default("unknown"),
  branch: text("branch"),
  path: text("path"),
  language: text("language").default("unknown"),
  os: text("os").default("unknown"),
  hostname: text("hostname").default("unknown"),
  timezone: text("timezone"),
  editor: text("editor").default("vs code"),
  created_at: date("created_at").defaultNow(),
});
