import { NextFunction, Request, Response } from "express";
import { firebaseApp } from "../firebaseConfig.js";
import jwt from "jsonwebtoken";
import { ExpiredToken, InvalidToken } from "../shared/errors.js";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    (req.headers.authorization || req.headers.Authorization)
      ?.toString()
      .replace(/^Bearer\s/, "") || "";

  if (!token) {
    return next(new InvalidToken());
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("Error al autenticar");
    }
    const decodedToken = jwt.verify(token, secretKey) as any;

    req.headers.firebaseUid = JSON.parse(decodedToken.user.usuario).uid;

    next();
  } catch (error: any) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      next(new ExpiredToken());
    } else {
      next(new InvalidToken());
    }
  }
}

export async function verifyFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    (req.headers.authorization || req.headers.Authorization)
      ?.toString()
      .replace(/^Bearer\s/, "") || "";

  if (!token) {
    return next(new InvalidToken());
  }

  try {
    const decodedToken = await firebaseApp.auth().verifyIdToken(token);

    req.headers.firebaseUid = decodedToken.uid;
    req.headers.firebaseEmail = decodedToken.email || "";

    next();
  } catch (error: any) {
    console.error("Error verificando token Firebase:", error);

    if (error.code === "auth/id-token-expired") {
      next(new ExpiredToken());
    } else {
      next(new InvalidToken());
    }
  }
}
