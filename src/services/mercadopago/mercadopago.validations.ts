import { NextFunction, Request, Response } from "express";
import { InvalidFields } from "../../shared/errors.js";
import Joi from "joi";

export const createPreferencia = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().min(1).required().messages({
          "string.empty": "El título del ítem es requerido",
          "any.required": "El título del ítem es requerido *",
        }),
        quantity: Joi.number().integer().positive().required().messages({
          "number.base": "La cantidad debe ser un número",
          "number.positive": "La cantidad debe ser mayor a 0",
          "any.required": "La cantidad es requerida *",
        }),
        currency_id: Joi.string().min(3).max(5).required().messages({
          "string.empty": "El campo currency_id es requerido",
          "any.required": "El campo currency_id es requerido *",
        }),
        unit_price: Joi.number().precision(2).required().messages({
          "number.base": "El precio unitario debe ser un número",
          "any.required": "El precio unitario es requerido *",
        }),
        description: Joi.string().required().messages({
          "number.base": "La descricpion debe ser válida",
          "any.required": "La descripción es requerida *",
        }),
      })
    )
    .min(1)
    .required(),
  notification_url: Joi.string().allow("").messages({
    "string.uri": "La URL de notificación debe ser válida",
  }),
  back_urls: Joi.object({
    success: Joi.string().uri().messages({
      "string.uri": "La URL de éxito debe ser válida",
      "any.required": "La URL de éxito es requerida *",
    }),
    pending: Joi.string().uri().messages({
      "string.uri": "La URL pendiente debe ser válida",
      "any.required": "La URL pendiente es requerida *",
    }),
    failure: Joi.string().uri().messages({
      "string.uri": "La URL de error debe ser válida",
      "any.required": "La URL de error es requerida *",
    }),
  }),
  metadata: Joi.object({
    user: Joi.object({
      metodoPago: Joi.string().min(2).max(20).required().messages({
        "string.empty": "El método de pago es requerido",
        "any.required": "El método de pago es requerido *",
      }),
      uid: Joi.string().min(10).max(70).required().messages({
        "string.empty": "El UID es requerido",
        "any.required": "El UID es requerido *",
      }),
      email: Joi.string().min(5).max(100).required().messages({
        "string.empty": "El EMAIL es requerido",
        "any.required": "El EMAIL es requerido *",
      }),
    }).required(),
  }).required(),
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
      const { error } = createPreferencia.validate(req.body.sanitizedInput);
      errorJoi = error;
    }

    if (errorJoi) {
      next(new InvalidFields(errorJoi.details[0].message));
    }
  }

  next();
};
