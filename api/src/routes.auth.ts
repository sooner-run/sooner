import { Hono } from "hono";
import { Signup } from "./controllers/auth/signup";
import { Login } from "./controllers/auth/login";

export const router = new Hono();

router.post("/signup", Signup);
router.post("/login", Login);
