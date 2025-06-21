import { Service } from "../../shared/service.js";
import { Especificaciones } from "./especificaciones.model.js";
import { DatabaseError } from "../../shared/errors.js";
import { executeStoredProcedure } from "../../database/executions.js";

export class EspecificacionesService implements Service<Especificaciones> {
  public async findAll(): Promise<any | undefined> {
    const params = {};

    let { recordset } = await executeStoredProcedure(
      "spListarEspecificaciones",
      params
    );

    return recordset;
  }

  public async findOne(item: { id: string }): Promise<any | undefined> {
    return;
  }

  public async add(items: Especificaciones): Promise<any> {
    try {
      const { tipo, cantidad, precio, limites } = items;

      const params = {
        TIPO: tipo,
        CANTIDAD: cantidad,
        PRECIO: precio,
        LIMITES: limites,
      };

      let { returnValue } = await executeStoredProcedure(
        "spCrearEspecificacion",
        params
      );

      return returnValue > 0;
    } catch (error: any) {
      throw new DatabaseError();
    }
  }

  public async update(items: Especificaciones): Promise<any> {
    try {
      const { id, tipo, cantidad, precio, limites } = items;

      const params = {
        ESPECIFICACION_ID: id,
        TIPO: tipo,
        CANTIDAD: cantidad,
        PRECIO: precio,
        LIMITES: limites,
      };

      let { returnValue } = await executeStoredProcedure(
        "spActualizarEspecificacion",
        params
      );

      return returnValue > 0;
    } catch (error: any) {
      throw new DatabaseError(error.message.toString());
    }
  }

  public async remove(item: { id: string }): Promise<any | undefined> {
    try {
      const { id } = item;

      const params = {
        ESPECIFICACION_ID: id,
      };

      let { returnValue } = await executeStoredProcedure(
        "spEliminarEspecificacion",
        params
      );

      return returnValue > 0;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
