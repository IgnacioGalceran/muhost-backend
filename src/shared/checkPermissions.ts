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
  let entidad: string = req.baseUrl.split("/")[2];
  let metodo: string = req.method;

  try {
    let params = {
      p_USR_UID: req.headers.firebaseUid,
    };
    let { recordset } = await executeStoredProcedure(
      "spObtenerUsuarioPorUid",
      params
    );

    let rol = JSON.parse(recordset[0].Usuario).RolNombre;

    if (rol === "Cliente") {
      throw new Unauthorized("Cliente");
    }

    if (entidad === "auth") {
      next();
    }

    next();
  } catch (error: any) {
    next(error);
  }
}
