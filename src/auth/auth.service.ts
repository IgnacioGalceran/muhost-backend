import { RegisterAdministrador } from "./auth.types.js";
import { executeStoredProcedure } from "../database/executions.js";
import jwt from "jsonwebtoken";
import { DatabaseError, NotFound } from "../shared/errors.js";

export class AuthService {
  generateCustomToken(userData: any) {
    return jwt.sign(
      {
        user: userData,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );
  }

  public async login(item: any) {
    try {
      // Extrae email y password de item.item en lugar de item
      const { email, password } = item;
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();

        if (errorResponse.error.message === "INVALID_LOGIN_CREDENTIALS") {
          throw new Error("Email y/o contraseña inválidos");
        }

        throw new Error(`Error en Firebase: ${errorResponse.error.message}`);
      }

      const firebaseResponse = await response.json();

      const { localId, idToken } = firebaseResponse;

      const user = await this.getUserData({ uid: localId });

      if (!user || user.length === 0) {
        throw new NotFound("Usuario no encontrado");
      }

      let estaActivo = JSON.parse(user[0].Usuario).activo;
      let token: string;

      if (!estaActivo) {
        return { user: null, token: idToken, activo: false };
      }

      token = this.generateCustomToken({
        usuario: user[0]?.Usuario,
      });

      return { user, token, activo: true };
    } catch (error) {
      throw error;
    }
  }

  public async obtenerToken(item: any) {
    try {
      const { uid } = item;
      const user = await this.getUserData({ uid });

      if (!user || user.length === 0) {
        throw new NotFound("Usuario no encontrado");
      }

      let token: string;

      token = this.generateCustomToken({
        usuario: user[0]?.Usuario,
      });

      return { user, token, activo: true };
    } catch (error) {
      throw error;
    }
  }

  public async activarUsuario(item: { uid: string }): Promise<any> {
    try {
      const { uid } = item;

      if (!uid) {
        throw new NotFound("uid");
      }

      const { returnValue } = await executeStoredProcedure("spActivarUsuario", {
        p_USR_UID: uid,
      });

      return returnValue > 0;
    } catch (error) {
      throw new DatabaseError();
    }
  }

  public async reenviarEmail(email: string, token: string) {
    try {
      const firebaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.FIREBASE_API_KEY}`;

      // Firebase espera el idToken en el payload, no el email
      const payload = {
        requestType: "VERIFY_EMAIL",
        idToken: token,
        continueUrl: "https://muhostback.ogdev.com.ar/api/auth/activarUsuario",
        handleCodeInApp: false,
      };

      const response = await fetch(firebaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();

        return { success: true };
      } else {
        const errorResponse = await response.json();
        console.error("Error al reenviar el correo:", errorResponse);
        return { success: false };
      }
    } catch (error) {
      console.error("Error reenviando el correo: ", error);
      return { success: false };
    }
  }

  public async getUserData(item: { uid: any }): Promise<any> {
    const params = {
      p_USR_UID: item.uid,
    };

    let { recordset } = await executeStoredProcedure(
      "spObtenerUsuarioPorUid",
      params
    );

    return recordset;
  }

  public async update(uid: string, data: any): Promise<any> {
    const params = {
      p_USR_UID: uid,
      p_USR_NOMBRE: data.nombre,
      p_USR_TELEFONO: data.telefono,
      p_USR_APELLIDO: data.apellido,
    };

    let { recordset } = await executeStoredProcedure(
      "spActualizarUsuario",
      params
    );

    return recordset;
  }

  public async findOneUsuario(item: { uid: any }): Promise<any | undefined> {
    return;
  }

  public async registerAdministrador(
    item: RegisterAdministrador
  ): Promise<any> {
    return;
  }

  public async verifyUser(item: { uid: string }): Promise<any> {
    return;
  }
}
