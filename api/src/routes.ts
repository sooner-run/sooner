import { Hono } from "hono";
import { create_pulse } from "./controllers/pulse/create_pulse";
import { retrieve_all_pulses } from "./controllers/pulse/retrieve_all_pulses";
import { retrieve_projects } from "./controllers/projects";
import { retrieve_single_project } from "./controllers/projects/project";
import { codetime_today } from "./controllers/codetime-today";
import { insights } from "./controllers/insights";

export const router = new Hono();

router.post("/pulses", create_pulse);
router.get("/pulses", retrieve_all_pulses);
router.get("/projects", retrieve_projects);
router.get("/projects/:project", retrieve_single_project);
router.get("/codetime-today", codetime_today);
router.get("/insights", insights);
