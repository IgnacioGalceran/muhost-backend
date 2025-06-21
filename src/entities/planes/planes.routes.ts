import express from "express";
import {
  add,
  findAll,
  findOne,
  update,
  remove,
  findAllLicencias,
} from "./planes.controller.js";
import sanitizeInput from "./planes.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { validateInput } from "./planes.validations.js";

export const router = express.Router();

router
  .get("/", findAll)
  .get("/obtenerLicenciasUsuarios", findAllLicencias)
  .get("/:id", findOne)
  .post("/", verifyToken, sanitizeInput, validateInput, add)
  .put("/:id", verifyToken, sanitizeInput, validateInput, update)
  .patch("/:id", verifyToken, sanitizeInput, validateInput, update)
  .delete("/:id", verifyToken, remove);
