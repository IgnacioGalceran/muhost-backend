import { NextFunction, Request, Response } from "express";
import { ClientesService } from "./clientes.service.js";

const service = new ClientesService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const clientes = await service.findAll();

    res.status(200).json({
      message: "Clientes encontrados.",
      error: false,
      data: clientes,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const cliente = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Cliente encontrado.",
      error: false,
      data: cliente,
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
    const cliente = await service.findOneUsuario({
      uid: req.headers.firebaseUid,
    });

    res.status(200).json({
      message: "Cliente encontrado.",
      error: false,
      data: cliente,
      status: 200,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { uid, token, success } = await service.create({
      ...req.body.sanitizedInput,
    });

    if (success) {
      return res.status(200).json({
        message: "Usuario creado.",
        error: false,
        data: { uid, token, success },
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "Error creando usuario.",
        error: false,
        data: null,
        status: 400,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export async function registerGoogle(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const success = await service.createGoogleClient({
      ...req.body.sanitizedInput,
    });

    console.log(success, req.body.sanitizedInput);

    if (success) {
      return res.status(200).json({
        message: "Usuario google creado.",
        error: false,
        data: req.body.sanitizedInput,
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "Error creando usuario.",
        error: false,
        data: null,
        status: 400,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const cliente = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Cliente actualizado.",
      error: false,
      data: cliente,
      status: 200,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const cliente = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Cliente borrado.",
      error: false,
      data: cliente,
      status: 200,
    });
  } catch (error: any) {
    next(error);
  }
}
