import { Context } from "hono";
import { pulses } from "../../db/schema";
import { db } from "../../db";
import languageData from "../../../data/languages.json";

// Function to get the language based on file extension
const getLanguageFromPath = (path: string) => {
  const extension = `.${path.split(".").pop()}`;
  for (const language of languageData) {
    if (
      Array.isArray(language.extensions) &&
      language.extensions.includes(extension)
    ) {
      return language.name;
    }
  }
  return "Unknown";
};

export const create_pulse = async (c: Context) => {
  try {
    const user_id = c.get("user_id");
    const body = await c.req.json();

    // Log the path and file extension for debugging purposes
    console.log("Path:", body.path);
    console.log("File extension:", `.${body.path.split(".").pop()}`);

    const language = getLanguageFromPath(body.path);

    await db.insert(pulses).values({
      user_id,
      ...body,
      language,
      path: body.path.replaceAll("\\", "/").replaceAll("//", "/"),
    });
    return c.json({ message: "Pulse created." }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
