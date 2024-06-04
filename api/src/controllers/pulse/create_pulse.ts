import { Context } from "hono";
import { pulses } from "../../db/schema";
import { db } from "../../db";

// For some reason VS Code returns 'plaintext' as the language for kotlin, I figured this may happen for other languages too, so just in case, this object would be updated.
const extensions: { [key: string]: string } = {
  ".kt": "kotlin",
};

export const create_pulse = async (c: Context) => {
  try {
    const user_id = c.get("user_id");
    const body = await c.req.json();

    const extension = Object.keys(extensions).find((ext) =>
      body.path.endsWith(ext)
    );
    const language = extension ? extensions[extension] : body.language;

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
