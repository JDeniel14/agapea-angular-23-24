import { ICliente } from "./cliente";

export interface IRestMessage{

  codigo:number;
  mensaje:string;
  error?:string;
  datoscliente?:ICliente;
  token?:string;
  otrosdatos?:any;
}
