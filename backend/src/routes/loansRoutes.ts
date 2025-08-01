import express from "express";
import { getLoans } from "../controllers/loansController";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/loans", isAuthenticated, getLoans);

export default router;
