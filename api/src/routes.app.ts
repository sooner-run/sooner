import { Hono } from "hono";
import { ApiKey } from "./controllers/app/apiKey";
import { Profile } from "./controllers/app/profile";
import { Extenison } from "./controllers/app/extension";

export const router = new Hono();

router.get("/api-key", ApiKey);
router.get("/profile", Profile);
router.get("/extension", Extenison);
