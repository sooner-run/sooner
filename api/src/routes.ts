import { Hono } from "hono";
import { create_pulse } from "./controllers/pulse/create_pulse";
import { retrieve_all_pulses } from "./controllers/pulse/retrieve_all_pulses";
import { retrieve_projects } from "./controllers/projects";

export const router = new Hono();

router.post("/pulses", create_pulse);
router.get("/pulses", retrieve_all_pulses);
router.get("/projects", retrieve_projects);
