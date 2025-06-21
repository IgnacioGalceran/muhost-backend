import { NextFunction, Request, Response } from "express";
import { InvalidFields } from "../../shared/errors.js";
import Joi from "joi";

const adicionalInsert = Joi.object({
  tipo: Joi.string().min(2).max(200).required(),
  precio: Joi.number().min(0).required(),
  duracion: Joi.number().min(0).max(9999).required(),
});

const adicionalUpdate = Joi.object({
  tipo: Joi.string().min(2).max(200).required(),
  precio: Joi.number().min(0).required(),
  duracion: Joi.number().min(0).max(9999).required(),
});

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorInput!: Joi.ValidationError | undefined;

  if (Object.keys(req.body.sanitizedInput).length) {
    if (req.method === "POST") {
      const { error } = adicionalInsert.validate(req.body.sanitizedInput);
      errorInput = error;
    } else if (req.method === "PUT") {
      const { error } = adicionalUpdate.validate(req.body.sanitizedInput);
      errorInput = error;
    }

    if (errorInput) {
      next(new InvalidFields(errorInput.details[0].message));
    }
  }

  next();
};
