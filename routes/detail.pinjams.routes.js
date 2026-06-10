import express from "express";
import {
    getAlldetailPinjam,
    tambahdetailbaru,
    caridetailPinjamByid,
    caridetailPinjamsByid,
    updatedetailPinjam,
    deletedetailPinjam,
    
} from "../controllers/detail.pinjams.controller.js";

/*import { authenticateToken } from "../middleware/VerifyTokens.js";*/
const router = express.Router();
router.get("/",  getAlldetailPinjam);
router.post("/",  tambahdetailbaru);
router.get("/pinjam/:id",  caridetailPinjamByid);
router.get("/buku/:id",  caridetailPinjamsByid);
//router.patch("/:id", updatedetailPinjam);
router.delete("/:id",  deletedetailPinjam);



export default router;
