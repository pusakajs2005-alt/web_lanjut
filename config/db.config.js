 import { Sequelize } from "sequelize";
 const db = new Sequelize('perpustakaan', 'root', '', {
     host: "localhost",
     dialect: "mysql",
      "define": {
        "timestamps": false
      }
    });
export default db;

