import { Service } from "../../shared/service.js";
import { Adicionales } from "./adicionales.model.js";
import { DatabaseError } from "../../shared/errors.js";
import { executeStoredProcedure } from "../../database/executions.js";

export class AdicionalesService implements Service<Adicionales> {
  public async findAll(): Promise<any | undefined> {
    const params = {};

    let { recordset } = await executeStoredProcedure(
      "spListarAdicionales",
      params
    );

    return recordset;
  }

  public async findOne(item: { id: string }): Promise<any | undefined> {
    return;
  }

  public async add(items: Adicionales): Promise<any> {
    try {
      const { tipo, precio, duracion } = items;

      const params = {
        TIPO: tipo,
        PRECIO: precio,
        DURACION: duracion,
      };

      let { returnValue } = await executeStoredProcedure(
        "spCrearAdicional",
        params
      );

      return returnValue > 0;
    } catch (error: any) {
      throw new DatabaseError();
    }
  }

  public async update(items: Adicionales): Promise<any> {
    try {
      const { tipo, precio, duracion } = items;

      const params = {
        ADICIONAL_ID: items.id,
        TIPO: tipo,
        PRECIO: precio,
        DURACION: duracion,
      };

      console.log(params);
      let { returnValue } = await executeStoredProcedure(
        "spActualizarAdicional",
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
        ADICIONAL_ID: id,
      };

      let { returnValue } = await executeStoredProcedure(
        "spEliminarAdicional",
        params
      );

      return returnValue > 0;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
