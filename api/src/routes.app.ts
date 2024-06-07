import { Hono } from "hono";
import { api_key } from "./controllers/app/api_key";
import { profile } from "./controllers/app/profile";
export const router = new Hono();

router.get("/api-key", api_key);
router.get("/profile", profile);
