import { eq } from "drizzle-orm";
import { db } from "./db";
import { pulses } from "./db/schema";

const deleteAllPulses = async () => {
  await db.delete(pulses);
};

const replaceLanguage = async () => {
  await db
    .update(pulses)
    .set({
      language: "CSS",
    })
    .where(eq(pulses.language, "css"));
};

// deleteAllPulses();
// replaceLanguage();
