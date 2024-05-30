import { Hono } from "hono";
import { api_key } from "./controllers/app/api_key";
export const router = new Hono();

router.get("/api-key", api_key);
