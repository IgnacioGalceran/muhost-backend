import { NextFunction, Request, Response } from "express";
import { MercadoPagoService } from "./mercadopago.service.js";

const service = new MercadoPagoService();

export async function getPago(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const cliente = await service.getPago(req.params.id);

    res.status(200).json({
      message: "Pago encontrado.",
      error: false,
      data: cliente,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function crearPreferencia(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const result = await service.crearPreferencia({
      ...req.body,
    });

    if (result) {
      return res.status(200).json({
        message: "Preferencia creada.",
        error: false,
        data: result,
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "Error creando preferencia.",
        error: false,
        data: null,
        status: 400,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export async function pagos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    res.status(200).json({
      message: "Pago recibido.",
      error: false,
      status: 200,
    });

    await service.pagos({
      ...req.body,
    });
  } catch (error: any) {
    next(error);
  }
}
