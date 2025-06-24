import { NextFunction, Request, Response } from "express";

export default function sanitizeInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    uid: req.body.uid,
    total: req.body.total,
    estado: req.body.estado,
    items: req.body.items,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
