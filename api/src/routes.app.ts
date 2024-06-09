import { Hono } from "hono";
import { ApiKey } from "./controllers/app/apiKey";
import { Profile } from "./controllers/app/profile";
export const router = new Hono();

router.get("/api-key", ApiKey);
router.get("/profile", Profile);
