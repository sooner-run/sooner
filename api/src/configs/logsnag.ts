import { LogSnag } from "@logsnag/node";

export const logsnag = new LogSnag({
  token: process.env.LOGSNAG_TOKEN!,
  project: "sooner",
});
