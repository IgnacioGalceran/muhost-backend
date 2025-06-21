import { NextFunction, Request, Response } from "express";
import { InvalidFields } from "../../shared/errors.js";
import Joi from "joi";

const espInsert = Joi.object({
  tipo: Joi.string().min(2).max(200).required(),
  cantidad: Joi.number().min(0).required(),
  precio: Joi.number().min(0).required(),
  limites: Joi.number().min(0).required(),
});

const espUpdate = Joi.object({
  tipo: Joi.string().min(2).max(200).required(),
  cantidad: Joi.number().min(0).required(),
  precio: Joi.number().min(0).required(),
  limites: Joi.number().min(0).required(),
});

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorInput!: Joi.ValidationError | undefined;

  if (Object.keys(req.body.sanitizedInput).length) {
    if (req.method === "POST") {
      const { error } = espInsert.validate(req.body.sanitizedInput);
      errorInput = error;
    } else if (req.method === "PUT") {
      const { error } = espUpdate.validate(req.body.sanitizedInput);
      errorInput = error;
    }

    if (errorInput) {
      next(new InvalidFields(errorInput.details[0].message));
    }
  }

  next();
};
