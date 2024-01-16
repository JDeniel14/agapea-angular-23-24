import { IDireccion } from "./direccion"
import { ILibro } from "./libro"

export interface IPedido{
  fechaPedido: Date,
  estadoPedido: string,
  elementosPedido:[
    {
      libroElemento: ILibro,
      cantidadElemento:number
    }
  ],
  subtotal: number,
  gastosEnvio: number,
  totalPedido: number,
  direccionEnvio: IDireccion,
  direccionFacturacion: IDireccion
}
