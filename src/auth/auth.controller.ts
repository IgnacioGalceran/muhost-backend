import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { Unauthorized } from "../shared/errors.js";

const service = new AuthService();

export async function getUserData(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const uid = req.query.uid;
    const user = await service.getUserData({ uid });

    res.status(200).json({
      message: "Usuario encontrado.",
      error: false,
      result: user,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { user, token, activo } = await service.login(req.body);

    if (!user && activo === false) {
      return res.status(498).json({
        message: "Usuario inactivo",
        error: true,
        result: { token },
        statusCode: 498,
      });
    } else {
      return res.status(200).json({
        message: "Logeado correctamente.",
        error: false,
        result: { user, token },
        statusCode: 200,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export async function obtenerToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { user, token, activo } = await service.obtenerToken({
      uid: req.query.uid,
    });

    if (!user && activo === false) {
      return res.status(498).json({
        message: "Usuario inactivo",
        error: true,
        result: { token },
        statusCode: 498,
      });
    } else {
      return res.status(200).json({
        message: "Logeado correctamente.",
        error: false,
        result: { user, token },
        statusCode: 200,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const firebaseUid = req.headers.firebaseUid || "Desconocido";
    res.status(200).json({
      message: "Token válido.",
      error: false,
      result: firebaseUid,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function activarUsuario(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { uid } = req.query;

    const activated = await service.activarUsuario({
      uid: uid as string,
    });

    if (activated <= 0) {
      return res.redirect("https://muhost.ogdev.com.ar/auth/activation/error");
    }

    return res.redirect("https://muhost.ogdev.com.ar/auth/activation/success");
  } catch (error: any) {
    next(error);
  }
}

export async function reenviarEmail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { email, token } = req.body;

    if (!email || !token) {
      next("Se requiere email y token para realizar la operación");
    }

    const result = await service.reenviarEmail(email, token);

    if (result.success) {
      return res
        .status(200)
        .json({ message: "Correo de verificación reenviado correctamente." });
    } else {
      return res
        .status(400)
        .json({ message: "No se pudo reenviar el correo de verificación." });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function updateUserData(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.headers.firebaseUid) {
      throw new Unauthorized("Actualizar perfil");
    }

    const user = await service.update(
      req.headers.firebaseUid.toString(),
      req.body
    );

    res.status(200).json({
      message: "Actualizado correctamente.",
      error: false,
      result: user,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findOneUsuario(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usuario = await service.findOneUsuario({
      uid: req.headers.firebaseUid,
    });

    res.status(200).json({
      message: "Usuario encontrado.",
      error: false,
      data: usuario,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function registerAdministrador(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const admin = await service.registerAdministrador(req.body.sanitizedInput);

    res.status(200).json({
      message: "Registrado correctamente.",
      error: false,
      data: admin,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usuario = await service.verifyUser({ uid: req.params.uid });

    res.status(200).json({
      message: "Usuario verificado correctamente.",
      error: false,
      data: usuario,
    });
  } catch (error: any) {
    next(error);
  }
}
