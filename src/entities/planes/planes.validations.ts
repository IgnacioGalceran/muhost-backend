import { NextFunction, Request, Response } from "express";
import { InvalidFields } from "../../shared/errors.js";
import Joi from "joi";

const planesInsert = Joi.object({
  titulo: Joi.string().min(2).max(200).required(),
  descripcion: Joi.string().min(2).max(200).required(),
  cantidad_cores: Joi.number().required(),
  cantidad_memoria: Joi.number().required(),
  cantidad_disco: Joi.number().required(),
});

const planesUpdates = Joi.object({
  titulo: Joi.string().min(2).max(200).required(),
  descripcion: Joi.string().min(2).max(200).required(),
  cantidad_cores: Joi.number().required(),
  cantidad_memoria: Joi.number().required(),
  cantidad_disco: Joi.number().required(),
});

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorInput!: Joi.ValidationError | undefined;

  if (Object.keys(req.body.sanitizedInput).length) {
    if (req.method === "POST") {
      const { error } = planesInsert.validate(req.body.sanitizedInput);
      errorInput = error;
    } else if (req.method === "PUT") {
      const { error } = planesUpdates.validate(req.body.sanitizedInput);
      errorInput = error;
    }

    if (errorInput) {
      next(new InvalidFields(errorInput.details[0].message));
    }
  }

  next();
};
