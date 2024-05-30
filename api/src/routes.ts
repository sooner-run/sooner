import { Hono } from "hono";
import { create_pulse } from "./controllers/pulse/create_pulse";
import { retrieve_all_pulses } from "./controllers/pulse/retrieve_all_pulses";

export const router = new Hono();

router.post("/pulse", create_pulse);
router.get("/pulses", retrieve_all_pulses);
