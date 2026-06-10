import express from "express";
import {
    getAllPinjam,
    cariPinjamByid,
    updatePinjam,
    deletePinjam,
    insertPinjam,
} from "../controllers/pinjams.controllers.js";

/*import { authenticateToken } from "../middleware/VerifyTokens.js";*/
const router = express.Router();
router.get("/",  getAllPinjam);
//router.post("/", tambahPinjambaru);
router.get("/nim/:id",  cariPinjamByid);
//router.patch("/:id", updatePinjam);
router.delete("/:id",  deletePinjam);
router.post("/",  insertPinjam);
//router.patch("/pengembalian/:id", updatePengembalian);


export default router;
