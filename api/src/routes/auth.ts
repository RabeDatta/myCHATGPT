import express from "express";
import { register, login, logout } from "../controllers/auth";
import { verifyCookieToken } from "../middleware/auth";

const router = express.Router();

router.post("/register", verifyCookieToken, register);

router.post("/login", verifyCookieToken, login);

router.post("/logout", verifyCookieToken, logout);

export default router;
