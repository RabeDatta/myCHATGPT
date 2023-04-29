import express from "express";
import { register, login, logout, userStatus } from "../controllers/auth";
import { verifyCookieToken } from "../middleware/verifyAuth";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/auth-status", verifyCookieToken, userStatus);

export default router;
