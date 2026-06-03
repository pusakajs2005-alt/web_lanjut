import detailPinjams from "../models/detail.pinjams.model.js";
import Buku from "../models/buku.model.js";
import Mahasiswas from "../models/mahasiswas.model.js"; 
import Pinjams from "../models/pinjams.model.js";

export const pengembalianBuku = async (req, res) => {

  try {

    for (let i = 0; i < req.body.data.length; i++) {

      // cari detail pinjam
      const detail = await detailPinjams.findOne({
        where: {
          id: req.body.data[i].id_detail_pinjam
        }
      });

      // cek data ada atau tidak
      if (!detail) {

        return res.status(404).json({
          message: "Detail pinjam tidak ditemukan"
        });

      }

      // validasi sudah dikembalikan
      if (detail.status == 2) {

        return res.status(400).json({
          message: "Buku sudah dikembalikan"
        });

      }

      // validasi jumlah kembali
      if (req.body.data[i].jml_kembali > detail.jml_pinjam) {

        return res.status(400).json({
          message: "Jumlah kembali melebihi jumlah pinjam"
        });

      }

  
      // KEMBALI SEMUA

      if (req.body.data[i].jml_kembali == detail.jml_pinjam) {

        await detailPinjams.update(
          {
            status: 2
          },
          {
            where: {
              id: detail.id
            }
          }
        );

      }

   
      // KEMBALI SEBAGIAN

      else {

        // update sisa pinjaman
        await detailPinjams.update(
          {
            jml_pinjam:
              detail.jml_pinjam -
              req.body.data[i].jml_kembali
          },
          {
            where: {
              id: detail.id
            }
          }
        );

        // insert riwayat pengembalian
        await detailPinjams.create({

          pinjam_id: detail.pinjam_id,
          buku_id: detail.buku_id,
          jml_pinjam: req.body.data[i].jml_kembali,
          status: 2,
        });
      }
      // tambah stok buku
      await Buku.increment(
        { jumlah: req.body.data[i].jml_kembali },
        {
          where: {
            kode_buku: detail.buku_id
          }
        }
      );

    }

    res.json({
      message: "Pengembalian berhasil"
    });

  } catch (error) {

    res.json({
      message: error.message
    });

  }

};


export const pengembalianSemua = async (req, res) => {

  try {

    const detail = await detailPinjams.findAll({
      where: {
        pinjam_id: req.params.id,
        status: 1
      }
    });

    // cek data
    if (detail.length == 0) {

      return res.status(400).json({
        message: "Buku sudah dikembalikan"
      });

    }

    // looping semua detail
    for (let i = 0; i < detail.length; i++) {

      // update status
      await detailPinjams.update(
        {
          status: 2,
        },
        {
          where: {
            id: detail[i].id
          }
        }
      );

      // tambah stok buku
      await Buku.increment(
        { jumlah: detail[i].jml_pinjam },
        {
          where: {
            kode_buku: detail[i].buku_id
          }
        }
      );

    }

    res.status(200).json({
      message: "Semua buku berhasil dikembalikan"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


export const getBukuDipinjam = async (req, res) => {

  try {

    const data = await Pinjams.findAll({

      where: {
        nim: req.params.id
      },

      include: [

        {
          model: Mahasiswas,
          attributes: ["nama"]
        },

        {
          model: detailPinjams,

          where: {
            status: 1
          },

          attributes: [
            "id",
            "jml_pinjam",
            "status"
          ],

          include: [
            {
              model: Buku,
              attributes: ["judul"]
            }
          ]

        }

      ]

    });

    res.json(data);

  } catch (error) {

    res.json({
      message: error.message
    });

  }

};

