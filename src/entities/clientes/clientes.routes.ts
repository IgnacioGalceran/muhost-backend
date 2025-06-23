import express from "express";
import {
  findAll,
  findOne,
  update,
  remove,
  register,
  registerGoogle,
} from "./clientes.controller.js";
import sanitizeInput from "./clientes.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { validateInput } from "./clientes.validations.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, validateInput, findOne)
  .post("/", sanitizeInput, validateInput, register)
  .post("/registerGoogle", sanitizeInput, registerGoogle)
  .put("/:id", sanitizeInput, validateInput, update)
  .delete("/:id", verifyToken, checkPermissions, remove);
