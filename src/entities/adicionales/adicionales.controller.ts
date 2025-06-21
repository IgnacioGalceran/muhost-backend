import { NextFunction, Request, Response } from "express";
import { AdicionalesService } from "./adicionales.service.js";

const service = new AdicionalesService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const Adicionales = await service.findAll();

    res.status(200).json({
      message: "Adicionales encontrados.",
      error: false,
      result: Adicionales,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function add(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const adicionalCreada = await service.add({
      ...req.body.sanitizedInput,
    });

    if (adicionalCreada)
      res.status(200).json({
        message: "Adicional creada.",
        error: false,
        result: adicionalCreada,
        status: 200,
      });
    else
      res.status(400).json({
        message: "No se pudo crear el adicional.",
        error: true,
        result: adicionalCreada,
        status: 400,
      });
  } catch (error: any) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const adicionalActualizada = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    if (adicionalActualizada)
      res.status(200).json({
        message: "Adicional actualizada.",
        error: false,
        result: adicionalActualizada,
        status: 200,
      });
    else
      res.status(400).json({
        message: "No se pudo actualizar el adicional.",
        error: true,
        result: adicionalActualizada,
        status: 400,
      });
  } catch (error: any) {
    next(error);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const Adicional = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Adicional borrado.",
      error: false,
      result: Adicional,
      status: 200,
    });
  } catch (error: any) {
    next(error);
  }
}
