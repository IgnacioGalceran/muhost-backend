import { EnviarEmailCriteria } from "./brevo.model.js";

export class BrevoService {
  public async enviarEmail(
    payload: EnviarEmailCriteria
  ): Promise<any | undefined> {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY!,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("No se pudo enviar el email");
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public generarHtml(
    numeroPedido: number,
    importe: number,
    items: any[],
    metadata: {
      nombre: string;
      apellido: string;
      email: string;
      telefono: string;
    }
  ): string {
    const rows = items
      .map(
        (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: left;">${item.title}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right;">$${item.unit_price}</td>
    </tr>`
      )
      .join("");

    const link = `https://muhost.ogdev.com.ar`;

    const fechaActual = new Date().toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f5f5">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <tr>
            <td bgcolor="#1a365d" style="padding: 25px 20px; text-align: center; color: white; font-size: 24px; font-weight: bold;">
              Nueva Donación Recibida
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 20px;">
              <p style="margin-top: 0; font-size: 18px; color: #333333;">
                Se ha registrado una nueva donación en el sistema <strong>MuHost</strong>.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                <tr>
                  <td colspan="2" style="padding: 10px 0; font-size: 16px; font-weight: bold;">Datos del Usuario:</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-size: 14px;"><strong>Nombre:</strong></td>
                  <td style="padding: 5px 0; font-size: 14px;">${
                    metadata.nombre
                  } ${metadata.apellido}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-size: 14px;"><strong>Email:</strong></td>
                  <td style="padding: 5px 0; font-size: 14px;">${
                    metadata.email
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-size: 14px;"><strong>Teléfono:</strong></td>
                  <td style="padding: 5px 0; font-size: 14px;">${
                    metadata.telefono
                  }</td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 5px 0; font-size: 16px;"><strong>Número de pedido:</strong> ${numeroPedido}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-size: 16px;"><strong>Fecha:</strong> ${fechaActual}</td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; border-collapse: collapse; border: 1px solid #e0e0e0;">
                <thead>
                  <tr bgcolor="#f8f8f8">
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0;">Item</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 1px solid #e0e0e0;">Cantidad</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e0e0e0;">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="text-align: right; padding: 15px 0; font-size: 18px; font-weight: bold;">
                    Total: $${importe}
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 15px 0; text-align: center;">
                    <a href="${link}" style="display: inline-block; padding: 14px 30px; background-color: #2d7db5; color: white; text-decoration: none; font-weight: bold; border-radius: 4px; font-size: 16px;">
                      Ver en el Panel de Administración
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; text-align: center; color: #666666; font-size: 14px;">
                    O copia este enlace en tu navegador:<br />
                    <span style="word-break: break-all; font-size: 12px;">${link}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#f0f0f0" style="padding: 20px; text-align: center; font-size: 12px; color: #666666;">
              <p style="margin: 5px 0;">© ${new Date().getFullYear()} MuHost</p>
              <p style="margin: 5px 0;">Este es un mensaje automático generado por el sistema</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}
