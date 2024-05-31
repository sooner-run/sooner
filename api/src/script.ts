import { db } from "./db";
import { pulses } from "./db/schema";

const deleteAllPulses = async () => {
  await db.delete(pulses);
};

deleteAllPulses();
