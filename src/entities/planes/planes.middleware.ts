import { NextFunction, Request, Response } from "express";

export default function sanitizeInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    cantidad_memoria: req.body.cantidad_memoria,
    cantidad_cores: req.body.cantidad_cores,
    cantidad_disco: req.body.cantidad_disco,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
