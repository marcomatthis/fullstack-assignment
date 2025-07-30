import express from "express";
import {
  login,
  register,
  getSession,
  logout,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/session", getSession);

export default router;
