import { NextFunction, Request, Response } from "express";

export default function sanitizeInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    email: req.body.email,
    nombre: req.body.nombre,
    uid: req.body.uid,
    apellido: req.body.apellido,
    password: req.body.contraseña,
    telefono: req.body.telefono,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
