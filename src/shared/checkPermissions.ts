import { NextFunction, Request, Response } from "express";
import { Usuarios } from "../auth/usuarios.entity.js";
import { Funciones } from "../security/funciones/funciones.entity.js";
import { DomingoError, Unauthorized, UserNotFounded } from "./errors.js";
import { executeStoredProcedure } from "../database/executions.js";

export default async function checkPermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let url: string = (req.baseUrl + req.url).split("api")[1];
  let metodo: string = req.method;

  let permission = {
    funcion: url,
    method: metodo,
  };

  try {
    let params = {
      p_USR_UID: req.headers.firebaseUid,
    };
    let { recordset } = await executeStoredProcedure(
      "spObtenerUsuarioPorUid",
      params
    );

    let funciones: [{ funcion: string; method: string }] = JSON.parse(
      recordset[0].Usuario
    ).Funciones;

    let tienePermiso = funciones.find(
      (f) =>
        permission.funcion.toLowerCase().includes(f.funcion.toLowerCase()) &&
        f.method.toLowerCase() === permission.method.toLowerCase()
    );

    if (!tienePermiso) {
      throw new Unauthorized(`${url}`);
    }

    next();
  } catch (error: any) {
    next(error);
  }
}
