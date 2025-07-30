import express from "express";
import { getLoans } from "../controllers/loansController";

const router = express.Router();

router.get("/loans", getLoans);

export default router;
