import detailPinjams from "../models/detail.pinjams.model.js";
import Pinjams from "../models/pinjams.model.js";
import Mahasiswas from "../models/mahasiswas.model.js";
import Buku from "../models/buku.model.js";

export const laporanPengembalian = async (req, res) => {

  try {

    const data = await detailPinjams.findAll({

      where: {
        status: 2
      },

      include: [
        {
          model: Pinjams,
          include: [
            {
              model: Mahasiswas,
              attributes: ["nama"]
            }
          ]
        },
        {
          model: Buku,
          attributes: ["kode_buku", "judul"]
        }
      ]

    });

    for (let i = 0; i < data.length; i++) {

  const pinjam = data[i].Pinjam;

  if (!pinjam) {

    data[i].dataValues.jumlah_hari_terlambat = 0;
    continue;

  }

  const batasKembali = new Date(
  pinjam.tanggal_kembali
);

const tanggalPengembalian = new Date(
  data[i].updated_at
);

batasKembali.setHours(0,0,0,0);
tanggalPengembalian.setHours(0,0,0,0);

const selisihBulan =
  (tanggalPengembalian - batasKembali) /
  (1000 * 60 * 60 * 24 * 30);

data[i].dataValues.jumlah_bulan_terlambat =
  selisihBulan > 0 ? selisihBulan + " bulan" : "0 bulan";
}

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
