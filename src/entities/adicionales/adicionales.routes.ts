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

router.use(verifyToken);

router
  .get("/", findAll)
  .get("/findTiposAdicionales", findTiposAdicionales)
  .post("/", sanitizeInput, checkPermissions, validateInput, add)
  .put("/:id", sanitizeInput, checkPermissions, validateInput, update)
  .patch("/:id", sanitizeInput, checkPermissions, validateInput, update)
  .delete("/:id", checkPermissions, remove);
