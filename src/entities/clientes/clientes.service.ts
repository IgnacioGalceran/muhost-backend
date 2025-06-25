import { Service } from "../../shared/service.js";
import { Clientes } from "./clientes.model.js";
import { DatabaseError, NotFound } from "../../shared/errors.js";
import { executeStoredProcedure } from "../../database/executions.js";
import { AuthService } from "../../auth/auth.service.js";

export class ClientesService implements Service<Clientes> {
  public async findAll(): Promise<Clientes[] | undefined> {
    return;
  }

  public async findOne(item: { id: string }): Promise<Clientes | undefined> {
    return;
  }

  public async findOneUsuario(item: { uid: any }): Promise<any | undefined> {
    return;
  }

  public async create(item: Clientes): Promise<any> {
    try {
      const { nombre, apellido, telefono, email, password } = item;

      // 1. Crear el usuario en Firebase
      const firebaseSignUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;
      const firebaseResponse = await fetch(firebaseSignUpUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (!firebaseResponse.ok) {
        const errorResponse = await firebaseResponse.json();

        const firebaseError = errorResponse.error?.message;

        if (firebaseError === "EMAIL_EXISTS") {
          throw new Error("El email ya está registrado.");
        }

        throw new Error(`Error en Firebase: ${firebaseError}`);
      }

      const firebaseData = await firebaseResponse.json();
      const uid = firebaseData.localId;
      const idToken = firebaseData.idToken;

      const params = {
        p_USR_NOMBRE: nombre,
        p_USR_APELLIDO: apellido,
        p_USR_EMAIL: email,
        p_USR_UID: uid,
        p_USR_TELEFONO: telefono,
      };

      let { returnValue } = await executeStoredProcedure(
        "spCrearUsuario",
        params
      );

      if (returnValue > 0) {
        const emailSent = await enviarEmailConfirmacion(email, idToken, uid);
        if (!emailSent) {
          console.warn(`No se pudo enviar el email de confirmación a ${email}`);
        }
      }

      return {
        success: true,
        token: idToken,
        uid: uid,
      };
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  public async createGoogleClient(item: Clientes): Promise<any> {
    try {
      const authService = new AuthService();
      const { email, uid, nombre, apellido, telefono } = item;

      const params = {
        p_USR_NOMBRE: nombre,
        p_USR_APELLIDO: apellido,
        p_USR_EMAIL: email,
        p_USR_UID: uid,
        p_USR_TELEFONO: telefono,
      };

      let { returnValue } = await executeStoredProcedure(
        "spCrearUsuarioGoogle",
        params
      );

      const user = await authService.getUserData({ uid });

      if (!user || user.length === 0) {
        throw new NotFound("Usuario no encontrado");
      }

      let token: string;

      token = authService.generateCustomToken({
        usuario: user[0]?.Usuario,
      });

      return { success: returnValue > 0, token };
    } catch (error: any) {
      console.log(error);
      throw new DatabaseError(error);
    }
  }

  public async update(item: Clientes): Promise<Clientes | undefined> {
    return;
  }

  public async remove(item: { id: string }): Promise<Clientes | undefined> {
    return;
  }
}

async function enviarEmailConfirmacion(
  email: string,
  idToken: string,
  uid: string
): Promise<boolean> {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.FIREBASE_API_KEY}`;

    const payload = {
      requestType: "VERIFY_EMAIL",
      idToken,
      continueUrl: `https://muhostback.ogdev.com.ar/api/auth/activarUsuario?uid=${uid}`,
      handleCodeInApp: false,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      throw new Error(
        `Error al enviar email de verificación: ${errorResponse.error.message}`
      );
    }

    return true;
  } catch (error) {
    return false;
  }
}
