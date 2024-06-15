import { Hono } from "hono";
import { Signup } from "./controllers/auth/signup";
import { Login } from "./controllers/auth/login";
import { Logout } from "./controllers/auth/logout";
import { Verify } from "./controllers/auth/verify";

export const router = new Hono();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/verify", Verify);
