import { NextFunction, Request, Response } from "express";
import { EspecificacionesService } from "./especificaciones.service.js";

const service = new EspecificacionesService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const Especificaciones = await service.findAll();

    res.status(200).json({
      message: "Especificaciones encontradas.",
      error: false,
      result: Especificaciones,
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
    const Especificacion = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Especificacion encontrada.",
      error: false,
      result: Especificacion,
      status: 200,
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
    const especificacionCreada = await service.add({
      ...req.body.sanitizedInput,
    });

    if (especificacionCreada)
      res.status(200).json({
        message: "Especificación creada.",
        error: false,
        result: especificacionCreada,
        status: 200,
      });
    else
      res.status(400).json({
        message: "No se pudo crear la especificación.",
        error: true,
        result: especificacionCreada,
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
    const especificacionActualizada = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    if (especificacionActualizada)
      res.status(200).json({
        message: "Especificación actualizada.",
        error: false,
        result: especificacionActualizada,
        status: 200,
      });
    else
      res.status(400).json({
        message: "No se pudo actualizar la especificación.",
        error: true,
        result: especificacionActualizada,
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
    const Especificacion = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Especificacion borrada.",
      error: false,
      result: Especificacion,
      status: 200,
    });
  } catch (error: any) {
    next(error);
  }
}
