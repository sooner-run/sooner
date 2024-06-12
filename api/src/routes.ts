import { Hono } from "hono";
import { RetrieveProjects } from "./controllers/projects";
import { Insights } from "./controllers/insights";
import { Stats } from "./controllers/stats";
import { CreatePulse } from "./controllers/pulse/createPulse";
import { RetrieveAllPulses } from "./controllers/pulse/retrieveAllPulses";
import { CodetimeToday } from "./controllers/codetimeToday";
import { RetrieveSingleProject } from "./controllers/projects/project";
import { ActivateExtension } from "./controllers/extension/activate";

export const router = new Hono();

router.post("/pulses", CreatePulse);
router.get("/pulses", RetrieveAllPulses);
router.get("/projects", RetrieveProjects);
router.get("/projects/:project", RetrieveSingleProject);
router.get("/codetime-today", CodetimeToday);
router.get("/insights", Insights);
router.get("/stats", Stats);
