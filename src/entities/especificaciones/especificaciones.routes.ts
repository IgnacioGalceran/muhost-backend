import express from "express";
import {
  add,
  findAll,
  findOne,
  update,
  remove,
} from "./especificaciones.controller.js";
import sanitizeInput from "./especificaciones.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { validateInput } from "./especificaciones.validations.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router.use(verifyToken);
router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/:id", validateInput, findOne)
  .post("/", sanitizeInput, validateInput, add)
  .put("/:id", sanitizeInput, validateInput, update)
  .patch("/:id", sanitizeInput, validateInput, update)
  .delete("/:id", remove);
