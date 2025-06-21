import { Request, Response, NextFunction } from "express";

function sanitizeString(value: any) {
  return typeof value === "string" ? value.trim() : value;
}

function cleanObject<T extends Record<string, any>>(
  obj: T,
  allowedKeys: string[]
): Partial<T> {
  const sanitized: any = {};
  for (const key of allowedKeys) {
    const value = obj[key];
    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && value.trim() === "")
    ) {
      sanitized[key] = sanitizeString(value);
    }
  }
  return sanitized;
}

export default function sanitizeInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  const items = Array.isArray(body.items)
    ? body.items.map((item: any) =>
        cleanObject(item, [
          "title",
          "quantity",
          "currency_id",
          "unit_price",
          "description",
        ])
      )
    : [];

  const user = body?.metadata?.user || {};
  const sanitizedUser = cleanObject(user, ["uid", "metodoPago", "email"]);

  const back_urls = cleanObject(body.back_urls || {}, [
    "success",
    "pending",
    "failure",
  ]);

  const sanitizedInput = {
    items,
    notification_url: sanitizeString(body.notification_url),
    metadata: { user: sanitizedUser },
    back_urls,
  };

  req.body.sanitizedInput = sanitizedInput;
  next();
}
