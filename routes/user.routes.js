import express from "express";

import {
  getAllUser,
  tambahuser,
  deleteUser,
  login
} from "../controllers/user.controllers.js";

import { authenticateToken } from "../middleware/VerifyTokens.js";

const routerUser = express.Router();

routerUser.post("/", tambahuser);
routerUser.get("/", getAllUser);
routerUser.post("/login", login);
routerUser.delete("/:id", deleteUser);

routerUser.get("/dashboard", authenticateToken, (req, res) => {
  res.send("Welcome to the dashboard!");
});

export default routerUser;
