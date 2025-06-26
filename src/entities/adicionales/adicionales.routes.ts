import express from "express";
import {
  add,
  findAll,
  update,
  remove,
  findTiposAdicionales,
} from "./adicionales.controller.js";
import sanitizeInput from "./adicionales.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { validateInput } from "./adicionales.validations.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", findAll)
  .get("/findTiposAdicionales", findTiposAdicionales)
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
  .delete("/:id", checkPermissions, remove);
