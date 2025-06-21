import { NextFunction, Request, Response } from "express";
import { InvalidFields } from "../shared/errors.js";
import Joi from "joi";

const registerCliente = Joi.object({
  uid: Joi.string().min(2).max(50).required(),
  nombre: Joi.string().min(2).max(30).required(),
  apellido: Joi.string().min(2).max(30).required(),
  dni: Joi.string().min(8).max(10).required(),
  tipoDni: Joi.string().min(2).max(30).required(),
  calle: Joi.number().min(10).max(100).required().messages({
    "any.empty": "Este campo no puede estar vacío",
    "any.valid": "Debe ser un número",
    "number.min": "La longitud mínima es de 7 números",
    "number.max": "La longitud máxima es de 8 números",
    "any.required": "Este campo es requerido *",
  }),
  numero: Joi.number().min(0).max(1200).required().messages({
    "any.empty": "Este campo no puede estar vacío",
    "any.valid": "Debe ser un número",
    "number.min": "La longitud mínima es de 0",
    "number.max": "El número máximo es de 1200",
    "any.required": "Este campo es requerido *",
  }),
});

export const registerVendedor = Joi.object({
  nombreFantasia: Joi.string().min(2).max(50).required().messages({
    "string.min": "La longitud mínima es de 2 caracteres",
    "string.max": "La longitud máxima es de 50 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  usuario: Joi.object({
    uid: Joi.string().min(0).max(50).allow(null),
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
    calle: Joi.number().min(10).max(100).required().messages({
      "any.empty": "Este campo no puede estar vacío",
      "any.valid": "Debe ser un número",
      "number.min": "La longitud mínima es de 7 números",
      "number.max": "La longitud máxima es de 8 números",
      "any.required": "Este campo es requerido *",
    }),
    numero: Joi.number().min(0).max(1200).required().messages({
      "any.empty": "Este campo no puede estar vacío",
      "any.valid": "Debe ser un número",
      "number.min": "La longitud mínima es de 0",
      "number.max": "El número máximo es de 1200",
      "any.required": "Este campo es requerido *",
    }),
    tipoDni: Joi.string().required().required().messages({
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
    dni: Joi.number().min(1000000).max(60000000).required().messages({
      "any.empty": "Este campo no puede estar vacío",
      "any.valid": "Debe ser un número",
      "number.min": "La longitud mínima es de 7 números",
      "number.max": "La longitud máxima es de 8 números",
      "any.required": "Este campo es requerido *",
    }),
  }),
});

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorJoi: any = "";
  let caso: string = req.baseUrl.split("/")[2];
  if (caso === "registerVendedor") {
    const { error } = registerVendedor.validate(req.body);
    errorJoi = error;
  } else if (caso === "registerCliente") {
    const { error } = registerCliente.validate(req.body);
    errorJoi = error;
  }

  if (errorJoi) {
    next(new InvalidFields(errorJoi.details[0].message));
  }

  next();
};
