import express from "express";
import {
  addImagen,
  findAll,
  update,
  // findOne,
  // update,
  // remove,
} from "./pedidos.controller.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { uploadByType } from "../../shared/multer.js";

export const router = express.Router();

router
  .get("/", verifyToken, findAll)
  .put("/:id", verifyToken, update)
  .post("/", uploadByType("transferencias").single("comprobante"), addImagen);
