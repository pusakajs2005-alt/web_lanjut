import { Sequelize } from "sequelize";
import Pinjams from "../models/pinjams.model.js";
import Mahasiswas from "../models/mahasiswas.model.js";
import detailPinjams from "../models/detail.pinjams.model.js";
import Buku from "../models/buku.model.js";

export const insertPinjam = async (req, res) => { 
  try {    
    const pinjam = await Pinjams.create(
      {      
        tanggal_pinjam: req.body.tanggal_pinjam, 
        tanggal_kembali: req.body.tanggal_kembali, 
        nim: req.body.nim, 
        pegawai_id: req.body.pegawai_id, 
        detail_pinjams: req.body.detail_pinjams
      }, 
      { 
        include: detailPinjams
      } 
    ); 
    
    if (pinjam && req.body.detail_pinjams) {

      for (let i = 0;i < req.body.detail_pinjams.length; i++ ){
        Buku.decrement(
      {jumlah : req.body.detail_pinjams[i].jml_pinjam},
      { where : { kode_buku: req.body.detail_pinjams[i].buku_id}}
      );
    }
  }
    res.json(pinjam); 
  }
    catch (error) { 
    res.json({ message: error.message }); 
  } 
};

export const getAllPinjam = async (req, res) => {
  try {
    const data = await Pinjams.findAll({ include: { model: Mahasiswas,attributes:["nama"] } });
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const tambahPinjambaru = async (req, res) => {
  try {
    const data = await Pinjams.create(req.body);
    res.json({ "message": "Data Pinjam berhasil disimpan" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const cariPinjamByid = async (req, res) => {
  try {
    const data = await Pinjams.findAll({
      include: [
        {
          model: Mahasiswas
        },
        {
          model: detailPinjams,
          include: [
            Buku
          ]
        }
      ],
      where: {
        nim: req.params.id
      }
    });
    res.json(data[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updatePinjam = async (req, res) => {
  try {
    const data = await Pinjams.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json({ "message": "Data Pinjam berhasil update" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deletePinjam = async (req, res) => {
  try {
    const data = await Pinjams.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({ "message": "Data Pinjam berhasil dihapus" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
/*export const insertPinjam = async (req, res) => {
  try {
    
    const pinjam = await Pinjams.create({
      tanggal_pinjam: req.body.tanggal_pinjam,
      tanggal_kembali: req.body.tanggal_kembali,
      nim: req.body.nim,
      pegawai_id: req.body.pegawai_id
    });

    
    
    for (const item of req.body.detailPinjams) {

      await detailPinjams.create({
        pinjam_id: pinjam.id,
        buku_id: item.buku_id,
        jml_pinjam: item.jml_pinjam,
        status: item.status
      });

     
      await Buku.decrement("jumlah", {
        by: item.jml_pinjam,
        where: { kode_buku: item.buku_id }
      });
    }

    res.json(pinjam);

  } catch (error) {
    res.json({ message: error.message });
  }
};*/

