import { NextFunction, Request, Response } from "express";
import { FuncionesService } from "./funciones.service.js";

const service = new FuncionesService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const funciones = await service.findAll();

    res.status(200).json({
      message: "Funciones encontrados.",
      error: false,
      data: funciones,
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
    const funcion = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Funcion encontrado.",
      error: false,
      data: funcion,
    });
  } catch (error: any) {
    next(error);
  }
}
