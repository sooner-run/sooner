import { Context } from "hono";
import { pulses } from "../../db/schema";
import { db } from "../../db";
import languageData from "../../../data/languages.json";

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

export const CreatePulse = async (c: Context) => {
  try {
    const user_id = c.get("user_id");
    const body = await c.req.json();

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
