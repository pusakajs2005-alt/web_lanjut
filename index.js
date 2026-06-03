import express from "express";
import db from "./config/db.config.js";
import Buku from "./routes/buku.routes.js";
import Mahasiswas from "./routes/mahasiswas.routes.js";
import Prodis from "./routes/prodis.routes.js";
import Pinjams from "./routes/pinjams.routes.js";
import detailPinjams from "./routes/detail.pinjams.routes.js";
import cors from "cors";
import PengembalianBuku from "./routes/pengembalian.buku.routes.js";
import LaporanPengembalian from "./routes/laporan.pengembalian.routes.js";
import detailPinjam from "./models/detail.pinjams.model.js";
import Users from "./routes/user.routes.js";

const app = express();

try {
    await db.authenticate();
    console.log("database ok");

    await db.sync();
    console.log("tabel berhasil dibuat");

} catch (error) {
    console.log("belum konek", error);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
res.json({message:"Hello coba backend untuk vercel"});
});
app.use('/api/bukus', Buku);
app.use('/api/mahasiswas', Mahasiswas);
app.use('/api/prodis', Prodis);
app.use('/api/pinjams', Pinjams);
app.use('/api/detailpinjam', detailPinjams);
app.use('/api/pengembalian', PengembalianBuku);
app.use('/api/laporan', LaporanPengembalian);
app.use('/api/user', Users);

app.listen(5000, () => {
    console.log("Server jalan di http://localhost:5000");
});
