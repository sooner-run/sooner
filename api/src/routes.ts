import { Hono } from "hono";
import { create_pulse } from "./controllers/pulse/create_pulse";

export const router = new Hono();

router.post("/pulse", create_pulse);
