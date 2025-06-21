import { NextFunction, Request, Response } from "express";
import { PlanesService } from "./planes.service.js";

const service = new PlanesService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const Planes = await service.findAll();

    res.status(200).json({
      message: "Planes encontrados.",
      error: false,
      result: Planes,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findAllLicencias(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const Licencias = await service.findAllLicencias();

    res.status(200).json({
      message: "Licencias encontrados.",
      error: false,
      result: Licencias,
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
    const Plan = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Plan encontrado.",
      error: false,
      result: Plan,
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
    const planCreado = await service.add({
      ...req.body.sanitizedInput,
    });

    if (planCreado)
      res.status(200).json({
        message: "Plan creado.",
        error: false,
        result: planCreado,
        status: 200,
      });
    else
      res.status(400).json({
        message: "No se pudo crear el plan.",
        error: true,
        result: planCreado,
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
    const planActualizado = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    if (planActualizado)
      res.status(200).json({
        message: "Plan actualizado.",
        error: false,
        result: planActualizado,
        status: 200,
      });
    else
      res.status(400).json({
        message: "No se pudo actualizar el plan.",
        error: true,
        result: planActualizado,
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
    const Plan = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Plan borrado.",
      error: false,
      result: Plan,
      status: 200,
    });
  } catch (error: any) {
    next(error);
  }
}
