import { NextFunction, Request, Response } from "express";
import { RolesService } from "./roles.service.js";
import { InvalidId } from "../../shared/errors.js";

const service = new RolesService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const roles = await service.findAll();

    res.status(200).json({
      message: "Roles encontrados.",
      error: false,
      data: roles,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const rol = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Rol encontrado.",
      error: false,
      data: rol,
    });
  } catch (error: any) {
    next(error);
  }
}
