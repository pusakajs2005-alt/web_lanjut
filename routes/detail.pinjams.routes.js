import express from "express";
import {
    getAlldetailPinjam,
    tambahdetailbaru,
    caridetailPinjamByid,
    caridetailPinjamsByid,
    updatedetailPinjam,
    deletedetailPinjam,
    
} from "../controllers/detail.pinjams.controller.js";

import { authenticateToken } from "../middleware/VerifyTokens.js";
const router = express.Router();
router.get("/", authenticateToken, getAlldetailPinjam);
router.post("/", authenticateToken, tambahdetailbaru);
router.get("/pinjam/:id", authenticateToken, caridetailPinjamByid);
router.get("/buku/:id", authenticateToken, caridetailPinjamsByid);
//router.patch("/:id", updatedetailPinjam);
router.delete("/:id", authenticateToken, deletedetailPinjam);



export default router;
