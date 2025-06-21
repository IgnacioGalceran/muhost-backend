import express from "express";
import { findAll, findOne } from "./roles.controller.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router.use(verifyToken);
router.use(checkPermissions);

router.get("/", findAll).get("/:id", findOne);
