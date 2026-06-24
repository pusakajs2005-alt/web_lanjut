import express from "express";
import {
    getAllPinjam,
    cariPinjamByid,
    updatePinjam,
    deletePinjam,
    insertPinjam,
} from "../controllers/pinjams.controllers.js";

import { authenticateToken } from "../middleware/VerifyTokens.js";
const router = express.Router();
router.get("/", authenticateToken, getAllPinjam);
//router.post("/", tambahPinjambaru);
router.get("/nim/:id", authenticateToken, cariPinjamByid);
//router.patch("/:id", updatePinjam);
router.delete("/:id", authenticateToken, deletePinjam);
router.post("/", authenticateToken, insertPinjam);
//router.patch("/pengembalian/:id", updatePengembalian);


export default router;
