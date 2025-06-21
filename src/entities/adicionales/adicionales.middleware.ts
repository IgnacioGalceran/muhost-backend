import { NextFunction, Request, Response } from "express";

export default function sanitizeInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    tipo: req.body.tipo,
    precio: req.body.precio,
    duracion: req.body.duracion,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
