import { Sequelize } from "sequelize";
import detailPinjams from "../models/detail.pinjams.model.js";
import Buku from "../models/buku.model.js";
import Pinjams from "../models/pinjams.model.js";
import Mahasiswas from "../models/mahasiswas.model.js";


export const getAlldetailPinjam=async (req, res)=>{
    try {
        const data= await detailPinjams.findAll({
          include: [
            {
              model:Pinjams,
              include:
              [Mahasiswas]
            },
              {
                model:Buku
              }
            ]
            });
        res.json(data);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const tambahdetailbaru=async (req, res)=>{
    try {
        const data= await detailPinjams.create(req.body);
        res.json({"message":"Data Detail Pinjam berhasil disimpan"});
    } catch (error) {
        res.json({message:error.message});
    }
};

export const caridetailPinjamByid=async (req, res)=>{
    try {
        const data= await detailPinjams.findAll({
          include: [
            {model:Pinjams,
              include:
              [Mahasiswas]}],
            where:{ 
                id:req.params.id
            }
            
        });
        res.json(data[0]);
    } catch (error) {
        res.json({message:error.message});
    }
};
export const caridetailPinjamsByid=async (req, res)=>{
    try {
        const data= await detailPinjams.findAll({
          include: [
            {model:Buku}],
            where:{ 
                id:req.params.id
            }
            
        });
        res.json(data[0]);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const updatedetailPinjam = async (req, res) => {
  try {
    const data = await detailPinjams.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json({ "message": "Data Detail Pinjam berhasil update" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deletedetailPinjam = async (req, res) => {
  try {
    const data = await detailPinjams.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({ "message": "Data Detail Pinjam berhasil dihapus" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

