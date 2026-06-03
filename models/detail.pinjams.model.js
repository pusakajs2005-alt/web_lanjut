import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Buku from "./buku.model.js";
import Pinjams from "./pinjams.model.js";


const { DataTypes } = Sequelize;

const detailPinjams = db.define("detail_pinjams", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pinjam_id: {
        type: DataTypes.INTEGER,
    },
    buku_id: {
        type: DataTypes.INTEGER,
    },
    jml_pinjam: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
},{
    freezeTableName: true,
});
Buku.hasMany(detailPinjams, { foreignKey: "buku_id" }); 
detailPinjams.belongsTo(Buku, { foreignKey: "buku_id" });

Pinjams.hasMany(detailPinjams, { foreignKey: "pinjam_id" }); 
detailPinjams.belongsTo(Pinjams, { foreignKey: "pinjam_id" });

export default detailPinjams;