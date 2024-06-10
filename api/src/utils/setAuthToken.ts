import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { isProd } from "../../constants";
import dayjs from "dayjs";

export const SetAuthToken = (c: Context, token: string) => {
  setCookie(c, "sooner.auth-token", token, {
    domain: isProd ? ".sooner.run" : "localhost",
    secure: isProd,
    sameSite: isProd ? "None" : "Strict",
    expires: dayjs().add(90, "days").toDate(),
    httpOnly: true,
  });
};
