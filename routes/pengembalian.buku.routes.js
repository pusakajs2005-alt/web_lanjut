import express from "express";

import {
  pengembalianBuku,
  pengembalianSemua,
  getBukuDipinjam
} from "../controllers/pengembalian.buku.controller.js";

/*import { authenticateToken } from "../middleware/VerifyTokens.js";*/
const router = express.Router();
router.get("/pinjam/:id",  getBukuDipinjam);
router.post("/kembali",  pengembalianBuku);
router.post("/kembali/:id",  pengembalianSemua);
export default router;
