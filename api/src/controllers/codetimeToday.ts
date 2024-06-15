import { Context } from "hono";
import { time_to_human } from "../utils/time_to_human";
import { GetCodeTimeToday } from "../utils/getCodetimeToday";

export const CodetimeToday = async (c: Context) => {
  try {
    const totalCodingTime = await GetCodeTimeToday(c.get("user_id"));

    return c.json(
      {
        time: Number(totalCodingTime),
        time_human_readable: time_to_human(Number(totalCodingTime)),
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json({ message: "Something went wrong." }, 500);
  }
};
