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
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router.use(verifyToken);
router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/obtenerLicenciasUsuarios", findAllLicencias)
  .get("/:id", findOne)
  .post("/", sanitizeInput, validateInput, add)
  .put("/:id", sanitizeInput, validateInput, update)
  .patch("/:id", sanitizeInput, validateInput, update)
  .delete("/:id", remove);
