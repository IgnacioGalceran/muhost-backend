import { NextFunction, Request, Response } from "express";

export default function sanitizeInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    tipo: req.body.tipo,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    limites: req.body.limites,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
