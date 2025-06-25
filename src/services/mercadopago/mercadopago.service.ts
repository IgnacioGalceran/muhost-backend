import { Service } from "../../shared/service.js";
import { Pago, PreferenciaRequest } from "./mercadopago.model.js";
import { RegisterCliente, Usuario } from "../../auth/auth.types.js";
import { DatabaseError } from "../../shared/errors.js";
import { executeStoredProcedure } from "../../database/executions.js";
import e from "express";
import sql, { connectDB } from "../../database/sql.config.js";

export class MercadoPagoService {
  private _mercadopago_api_url = "https://api.mercadopago.com/";
  private _notification_url =
    "https://muhostback.ogdev.com.ar/api/mercadopago/pagos";

  public async getPago(id: string): Promise<any | undefined> {
    try {
      const response = await fetch(
        `${this._mercadopago_api_url}v1/payments/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESSTOKEN}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("No se pudo obtener el pago");
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async crearPreferencia(item: PreferenciaRequest): Promise<any> {
    try {
      item.notification_url = this._notification_url;

      const response = await fetch(
        `${this._mercadopago_api_url}checkout/preferences`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESSTOKEN}`,
          },
          body: JSON.stringify(item),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("No se pudo crear la preferencia");
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async pagos(item: any): Promise<any> {
    try {
      if (item.type !== "payment" && item.topic !== "payment") {
        return { success: true, message: "Evento ignorado" };
      }

      const paymentId = item.data?.id;
      if (!paymentId) {
        throw new Error("No se encontró el paymentId en el webhook");
      }

      const pago = await this.getPago(paymentId);
      const status = pago.status;
      const transaction_amout = pago.transaction_amount;
      const metadata = pago.metadata;
      const items = pago.additional_info?.items ?? [];

      if (status !== "approved" && status !== "pending") {
        return {
          success: false,
          message: "Pago no aprobado o pendiente",
          status: 400,
          metadata,
        };
      }

      const success = await crearPagoConItems({
        mercadoPagoId: paymentId,
        uid: metadata.user.uid,
        metodo_pago: "mercadopago",
        total: transaction_amout,
        estado: pago.status || "",
        items: items.map((it: any) => ({
          title: it.title,
          quantity: it.quantity,
          unit_price: it.unit_price,
          id: it.description.split("-")[0],
          tipo: it.description.split("-")[1],
          vps_id: it.description.split("-")[2],
        })),
      });

      if (success) {
        return {
          success: true,
          message: "Pago aprobado yregistrado correctamente",
          status: 201,
          metadata,
        };
      }

      return {
        success: true,
        message: "Pago aprobado, sin registrar",
        status: 204,
        metadata,
      };
    } catch (error: any) {
      console.error("Error procesando el pago:", error);
      return {
        success: false,
        error: error.message || error,
      };
    }
  }
}

export async function crearPagoConItems(pagoData: {
  mercadoPagoId: string;
  uid: string;
  metodo_pago: string;
  estado: string;
  total: number;
  items: Array<{
    title: string;
    quantity: number;
    unit_price: number;
    id: string;
    tipo: string;
    vps_id: string;
  }>;
}) {
  const pool = await connectDB();
  const tvp = new sql.Table("dbo.tvp_DetallePago");

  tvp.columns.add("DET_ESP_ID", sql.Int, { nullable: true });
  tvp.columns.add("DET_ESP_CANTIDAD", sql.Int, { nullable: true });
  tvp.columns.add("DET_ADI_ID", sql.Int, { nullable: true });
  tvp.columns.add("DET_ADI_CANTIDAD", sql.Int, { nullable: true });
  tvp.columns.add("DET_VPS_ID", sql.Int, { nullable: true });

  pagoData.items.forEach((it) => {
    if (it.tipo === "Especificación") {
      tvp.rows.add(
        Number(it.id),
        Number(it.quantity),
        null,
        null,
        Number(it.vps_id)
      );
    } else if (it.tipo === "Adicional") {
      tvp.rows.add(
        null,
        null,
        Number(it.id),
        Number(it.quantity),
        Number(it.vps_id)
      );
    }
  });

  console.log(pagoData);

  const request = pool
    .request()
    .input("MercadoPagoId", sql.NVarChar, pagoData.mercadoPagoId)
    .input("Uid", sql.NVarChar, pagoData.uid)
    .input("MetodoPago", sql.NVarChar, pagoData.metodo_pago)
    .input("Estado", sql.NVarChar, pagoData.estado)
    .input("Total", sql.Decimal(18, 2), pagoData.total)
    .input("Imagen_url", sql.NVarChar, "")
    .input("Items", tvp);

  const result = await request.execute("dbo.spCrearPago");

  return result.returnValue > 0;
}
