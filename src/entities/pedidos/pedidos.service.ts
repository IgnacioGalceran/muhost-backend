import { Pedidos } from "./pedidos.model.js";
import { DatabaseError } from "../../shared/errors.js";
import { executeStoredProcedure } from "../../database/executions.js";
import sql, { connectDB } from "../../database/sql.config.js";
import { Item } from "../../services/mercadopago/mercadopago.model.js";
import { BrevoService } from "../../services/brevo/brevo.service.js";

export class PedidosService {
  private brevoService = new BrevoService();

  public async findAll(): Promise<any[] | undefined> {
    try {
      const result = await executeStoredProcedure(
        "spObtenerPagosPendientesJson",
        {}
      );
      const jsonString = result.recordset?.[0]?.pagos;
      if (!jsonString) return [];

      return JSON.parse(jsonString);
    } catch (error: any) {
      console.log(error);
      throw new DatabaseError(error.message);
    }
  }

  public async addImagen(body: any, image_url: string): Promise<any> {
    try {
      const items = JSON.parse(body.items);

      let itemsFormateados: Array<{
        title: string;
        quantity: number;
        unit_price: number;
        id: string;
        tipo: string;
        vps_id: string;
      }> = items.map((it: any) => ({
        title: it.title,
        quantity: it.quantity,
        unit_price: it.unit_price,
        id: it.description.split("-")[0],
        tipo: it.description.split("-")[1],
        vps_id: it.description.split("-")[2],
      }));

      console.log(itemsFormateados);

      const pool = await connectDB();
      const tvp = new sql.Table("dbo.tvp_DetallePago");
      tvp.columns.add("DET_ESP_ID", sql.Int, { nullable: true });
      tvp.columns.add("DET_ESP_CANTIDAD", sql.Int, { nullable: true });
      tvp.columns.add("DET_ADI_ID", sql.Int, { nullable: true });
      tvp.columns.add("DET_ADI_CANTIDAD", sql.Int, { nullable: true });
      tvp.columns.add("DET_VPS_ID", sql.Int, { nullable: true });

      itemsFormateados.forEach((it) => {
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

      const request = pool
        .request()
        .input("Uid", sql.NVarChar, body.uid)
        .input("MetodoPago", sql.NVarChar, "transferencia")
        .input("Estado", sql.NVarChar, "pending")
        .input("Total", sql.Decimal(18, 2), Number(body.total))
        .input("Items", tvp)
        .input("Imagen_url", sql.NVarChar, image_url);

      const result = await request.execute("dbo.spCrearPago");
      const user = result.recordset[0];

      this.brevoService.enviarEmail({
        sender: {
          email: "nachogalceran14@gmail.com",
          name: "Mu Host",
        },
        to: [
          {
            email: "aleobrador.gmail.com",
            name: "Alejandro Obrador",
          },
        ],
        subject: `Nuevo pedido - Transferencia`,
        htmlContent: this.brevoService.generarHtml(
          result.returnValue,
          body.total,
          itemsFormateados,
          {
            nombre: user?.nombre,
            apellido: user?.apellido,
            telefono: user?.telefono,
            email: user?.email,
          }
        ),
      });

      return result.returnValue > 0;
    } catch (error: any) {
      console.log(error);
      throw new DatabaseError();
    }
  }

  public async update({
    id_pedido,
    aprobado,
  }: {
    id_pedido: number;
    aprobado: boolean;
  }): Promise<any> {
    try {
      const params = {
        PAGO_ID: id_pedido,
        APROBADO: aprobado ? 1 : 0,
      };

      let { returnValue } = await executeStoredProcedure(
        "spActualizarPago",
        params
      );

      return returnValue > 0;
    } catch (error: any) {
      throw new DatabaseError(error.message.toString());
    }
  }
}
