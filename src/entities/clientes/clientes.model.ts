export interface Clientes extends Usuario {}

export interface Usuario {
  email: string;
  uid: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol?: number;
  password?: string;
}
