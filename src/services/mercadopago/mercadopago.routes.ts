import express from "express";
import { crearPreferencia, getPago, pagos } from "./mercadopago.controller.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { validateInput } from "./mercadopago.validations.js";
import checkPermissions from "../../shared/checkPermissions.js";
import sanitizeInput from "./mercadopago.middleware.js";

export const router = express.Router();

router
  .post("/crearPreferencia", sanitizeInput, validateInput, crearPreferencia)
  .post("/pagos", pagos);
