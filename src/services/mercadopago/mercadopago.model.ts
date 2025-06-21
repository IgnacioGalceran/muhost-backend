interface Item {
  title: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
  description: number;
}

interface Metadata {
  user: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    altura: string;
    piso: string;
    departamento: string;
    provincia: string;
    ciudad: string;
    metodoPago: string;
    user_uid: string;
  };
}

interface BackUrls {
  success: string;
  pending: string;
  failure: string;
}

interface Payer {
  email: string;
}

export interface PreferenciaRequest {
  items: Item[];
  notification_url: string;
  metadata: Metadata;
  back_urls: BackUrls;
}

export interface Pago {}
