import { NextFunction, Request, Response } from "express";
import { InvalidFields } from "../../shared/errors.js";
import Joi from "joi";

export const createCliente = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(6)
    .max(50)
    .required()
    .messages({
      "string.min": "La longitud mínima es de 6 caracteres",
      "string.max": "La longitud máxima es de 50 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
  nombre: Joi.string().min(2).max(30).required().messages({
    "string.min": "La longitud mínima es de 2 caracteres",
    "string.max": "La longitud máxima es de 30 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  password: Joi.string().min(2).max(20).required().messages({
    "string.min": "La longitud mínima es de 2 caracteres",
    "string.max": "La longitud máxima es de 20 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  apellido: Joi.string().min(2).max(30).required().messages({
    "string.min": "La longitud mínima es de 2 caracteres",
    "string.max": "La longitud máxima es de 30 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  telefono: Joi.string().min(10).max(15).required().messages({
    "string.min": "La longitud mínima es de 2 caracteres",
    "string.max": "La longitud máxima es de 30 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
});

export const updateCliente = Joi.object({
  nombre: Joi.string().min(2).max(30).required().messages({
    "string.min": "La longitud mínima es de 2 caracteres",
    "string.max": "La longitud máxima es de 30 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  apellido: Joi.string().min(2).max(30).required().messages({
    "string.min": "La longitud mínima es de 2 caracteres",
    "string.max": "La longitud máxima es de 30 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  telefono: Joi.string().min(10).max(15).required().messages({
    "string.min": "La longitud mínima es de 2 caracteres",
    "string.max": "La longitud máxima es de 30 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
});

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorJoi!: any;
  if (Object.keys(req.body.sanitizedInput).length) {
    if (req.method === "POST") {
      req.body.sanitizedInput;
      const { error } = createCliente.validate(req.body.sanitizedInput);
      errorJoi = error;
    } else if (req.method === "PUT") {
      const { error } = updateCliente.validate(req.body.sanitizedInput);
      errorJoi = error;
    }

    if (errorJoi) {
      next(new InvalidFields(errorJoi.details[0].message));
    }
  }

  next();
};
