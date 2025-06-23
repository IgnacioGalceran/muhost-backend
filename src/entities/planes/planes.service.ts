import { Service } from "../../shared/service.js";
import { Planes } from "./planes.model.js";
import { DatabaseError } from "../../shared/errors.js";
import { executeStoredProcedure } from "../../database/executions.js";

export class PlanesService implements Service<Planes> {
  public async findAll(): Promise<any | undefined> {
    const params = {};

    let { recordset } = await executeStoredProcedure("spListarPlanes", params);

    return recordset;
  }

  public async findOne(item: { id: string }): Promise<any | undefined> {
    try {
      const params = {
        UsuarioUid: item.id,
      };

      let result: any = await executeStoredProcedure(
        "spObtenerLicenciasActuales",
        params
      );

      const rawData = result.recordset.flat();

      console.log("rawData: ", rawData);
      if (rawData[0] === null) {
        return [];
      }

      return rawData;
    } catch (error) {
      console.log(error);
      throw new DatabaseError();
    }
  }

  public async findAllLicencias(): Promise<any | undefined> {
    try {
      let result: any = await executeStoredProcedure(
        "spObtenerTodasLasLicenciasActuales",
        {}
      );

      const rawData = result.recordset.flat();

      console.log("rawData: ", rawData);
      if (rawData[0] === null) {
        return [];
      }

      return rawData;
    } catch (error) {
      throw new DatabaseError();
    }
  }

  public async add(item: Planes): Promise<any> {
    try {
      const {
        titulo,
        descripcion,
        cantidad_cores,
        cantidad_memoria,
        cantidad_disco,
      } = item;

      const params = {
        TITULO: titulo,
        DESCRIPCION: descripcion,
        CANTIDAD_CORES: cantidad_cores,
        CANTIDAD_MEMORIA: cantidad_memoria,
        CANTIDAD_DISCO: cantidad_disco,
      };

      let { returnValue } = await executeStoredProcedure("spCrearPlan", params);

      return returnValue > 0;
    } catch (error: any) {
      throw new DatabaseError();
    }
  }

  public async update(item: Planes): Promise<any> {
    try {
      const {
        id,
        titulo,
        descripcion,
        cantidad_memoria,
        cantidad_cores,
        cantidad_disco,
      } = item;

      const params = {
        PLAN_ID: id,
        TITULO: titulo,
        DESCRIPCION: descripcion,
        CANTIDAD_CORES: cantidad_cores,
        CANTIDAD_MEMORIA: cantidad_memoria,
        CANTIDAD_DISCO: cantidad_disco,
      };

      let { returnValue } = await executeStoredProcedure(
        "spActualizarPlan",
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
        PLAN_ID: id,
      };

      let { returnValue } = await executeStoredProcedure(
        "spEliminarPlan",
        params
      );

      return returnValue > 0;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
