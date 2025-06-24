import { NextFunction, Request, Response } from "express";
import { PedidosService } from "./pedidos.service.js";

const service = new PedidosService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const Pedidos = await service.findAll();

    res.status(200).json({
      message: "Pedidos encontrados.",
      error: false,
      result: Pedidos,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function addImagen(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | any> {
  try {
    const image_url = `${req.protocol}://${req.get(
      "host"
    )}/uploads/transferencias/${req?.file?.filename}`;

    if (image_url) {
      const imagenCreada = await service.addImagen(req.body, image_url);

      if (imagenCreada)
        res.status(200).json({
          message: "Imagen cargada.",
          error: false,
          result: imagenCreada,
          status: 200,
        });
      else
        res.status(400).json({
          message: "No se pudo crear la imagen.",
          error: true,
          result: imagenCreada,
          status: 400,
        });
    }
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
    const pagoActualizado = await service.update({
      id_pedido: Number(req.params.id),
      aprobado: req.body.aprobado,
    });

    if (pagoActualizado)
      res.status(200).json({
        message: "Pago actualizado.",
        error: false,
        result: pagoActualizado,
        status: 200,
      });
    else
      res.status(400).json({
        message: "No se pudo actualizar el pago.",
        error: true,
        result: pagoActualizado,
        status: 400,
      });
  } catch (error: any) {
    next(error);
  }
}
