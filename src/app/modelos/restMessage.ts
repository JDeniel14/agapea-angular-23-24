import { ICliente } from "./cliente";

export interface IRestMessage{

  codigo:number;
  mensaje:string;
  error?:string;
  datosCliente?:ICliente;
  tokenSesion?:string;
  otrosDatos?:any;
}
