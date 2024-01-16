import { ICuenta } from "./cuenta";
import { IDireccion } from "./direccion";
import { IPedido } from "./pedido";

export interface  ICliente{

  nombre:string,
  apellidos:string,
  cuenta:ICuenta,
  //cuenta:{email:string, password:string, imagenAvatarBASE64:string},
  telefono:string,
  direcciones?:IDireccion[],
  pedidos?:IPedido[],
  genero?:string,
  fechaNacimiento?:Date,
  descripcion?:string

}
