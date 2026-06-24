import express from "express";

import {
  pengembalianBuku,
  pengembalianSemua,
  getBukuDipinjam
} from "../controllers/pengembalian.buku.controller.js";

import { authenticateToken } from "../middleware/VerifyTokens.js";
const router = express.Router();
router.get("/pinjam/:id", authenticateToken, getBukuDipinjam);
router.post("/kembali", authenticateToken, pengembalianBuku);
router.post("/kembali/:id", authenticateToken, pengembalianSemua);
export default router;
