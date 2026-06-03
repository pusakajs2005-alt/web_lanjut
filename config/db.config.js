 import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';
 const db = new Sequelize('web_lanjut', 'avnadmin', 'AVNS_8FZj8Wqs6QbEvxD11nw', {
     host: "mysql-c850987-weblanjut1.h.aivencloud.com",
     dialect: "mysql",
     port: 25801,
     dialectOptions: { 
        ssl: { 
        rejectUnauthorized: false 
       } 
    }, 
      "define": {
        "timestamps": false
      }
    });
export default db;

