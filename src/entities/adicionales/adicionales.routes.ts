import express from "express";
import { add, findAll, update, remove } from "./adicionales.controller.js";
import sanitizeInput from "./adicionales.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { validateInput } from "./adicionales.validations.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", findAll)
  .post("/", verifyToken, sanitizeInput, validateInput, add)
  .put("/:id", verifyToken, sanitizeInput, validateInput, update)
  .patch("/:id", verifyToken, sanitizeInput, validateInput, update)
  .delete("/:id", verifyToken, remove);
