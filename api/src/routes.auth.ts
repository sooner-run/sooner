import { Hono } from "hono";
import { signup } from "./controllers/auth/signup";
import { login } from "./controllers/auth/login";

export const router = new Hono();

router.post("/signup", signup);
router.post("/login", login);
