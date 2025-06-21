export interface Usuario {
  email: string;
  uid: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol?: number;
  direccion: string;
}

export interface RegisterAdministrador extends Usuario {}
export interface RegisterCliente extends Usuario {
  password: string;
  usuario: Usuario;
}
export interface RegisterRepartidor {
  email: string;
  password: string;
  usuario: Usuario;
}

export interface RegisterVendedor {
  password: string;
  nombreFantasia: string;
  rubro: string;
  usuario: Usuario;
}
