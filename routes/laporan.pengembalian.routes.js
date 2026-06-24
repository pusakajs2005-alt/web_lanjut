import express from "express";

import {
  laporanPengembalian
} from "../controllers/laporan.pengembalian.controller.js";

import { authenticateToken } from "../middleware/VerifyTokens.js";
const router = express.Router();
router.get("/", authenticateToken, laporanPengembalian);

export default router;
