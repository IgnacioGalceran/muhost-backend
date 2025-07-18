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

router
  .get("/", findAll)
  .get("/:id", validateInput, findOne)
  .post("/", verifyToken, checkPermissions, sanitizeInput, validateInput, add)
  .put(
    "/:id",
    verifyToken,
    checkPermissions,
    sanitizeInput,
    validateInput,
    update
  )
  .patch(
    "/:id",
    verifyToken,
    checkPermissions,
    sanitizeInput,
    validateInput,
    update
  )
  .delete("/:id", verifyToken, checkPermissions, remove);
