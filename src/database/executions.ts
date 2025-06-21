import sql from "mssql";
import { connectDB } from "./sql.config.js";

export async function executeStoredProcedure(
  spName: string,
  params: Record<string, any> = {}
) {
  try {
    const pool = await connectDB();
    const request = pool.request();

    for (const [paramName, paramValue] of Object.entries(params)) {
      if (typeof paramValue === "number") {
        request.input(paramName, sql.Int, paramValue);
      } else if (typeof paramValue === "string") {
        request.input(paramName, sql.NVarChar, paramValue);
      } else {
        request.input(paramName, paramValue);
      }
    }

    const result = await request.execute(spName);
    return result;
  } catch (error) {
    console.error(`Error al ejecutar el stored procedure ${spName}:`, error);
    throw error;
  }
}
