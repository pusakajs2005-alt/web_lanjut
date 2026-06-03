import { Sequelize } from "sequelize";
import Mahasiswas from "../models/mahasiswas.model.js";
import ref_prodi from "../models/prodis.model.js";

export const getAllMahasiswa=async (req, res)=>{
    try {
        const data= await Mahasiswas.findAll({include: {model:ref_prodi}});
        res.json(data);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const tambahmahasiswabaru=async (req, res)=>{
    try {
        const data= await Mahasiswas.create(req.body);
        res.json({"message":"Data Mahasiswa berhasil disimpan"});
    } catch (error) {
        res.json({message:error.message});
    }
};

export const cariMahasiswaByNIM=async (req, res)=>{
    try {
        const data= await Mahasiswas.findAll({
            where:{ 
                nim:req.params.id
            }
        });
        res.json(data[0]);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const updateMahasiswa = async (req, res) => {
  try {
    const data = await Mahasiswas.update(req.body, {
      where: {
        nim: req.params.id
      }
    });
    res.json({ "message": "Data Mahasiswa berhasil update" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteMahasiswa = async (req, res) => {
  try {
    const data = await Mahasiswas.destroy({
      where: {
        nim: req.params.id
      }
    });
    res.json({ "message": "Data Mahasiswa berhasil dihapus" });
  } catch (error) {
    res.json({ message: error.message });
  }
};