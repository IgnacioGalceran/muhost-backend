import express from "express";
import {
  activarUsuario,
  checkToken,
  findOneUsuario,
  getUserData,
  login,
  obtenerToken,
  reenviarEmail,
  registerAdministrador,
  updateUserData,
  verifyUser,
} from "./auth.controller.js";
import { verifyFirebaseToken, verifyToken } from "./auth.middleware.js";
import { validateRegister } from "./auth.validations.js";
import checkPermissions from "../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/findOneUsuario/", verifyToken, findOneUsuario)
  .get("/getUserData", getUserData)
  .get("/activarUsuario", activarUsuario)
  .get("/checkToken", verifyToken, checkToken)
  .get("/obtenerToken", verifyFirebaseToken, obtenerToken)
  .put("/verifyUser/:uid", verifyUser)
  .post("/reenviarEmail", reenviarEmail)
  .post("/login", login)
  .post("/verifyToken", verifyToken)
  .put("/updateUserData/:uid", verifyToken, updateUserData);
