import { IDireccion } from './direccion';

export interface IDatosPago {
  //datos de envio
  DireccionPrincipal: IDireccion;
  DireccionEnvio: IDireccion;
  NombreDestinatario: string;
  ApellidosDestinatario: string;
  TelefonoDestinatario: string;
  EmailDestinatario: string;

  //datos facturacion
  NombreFactura : string;
  DocFiscalFactura:string;

  //datos pago
  MetodoPago:string ;
  NumeroTarjeta : string;
  NombreBanco:string;
  MesCaducidad:number;
  AnioCaducidad:number;
  CVV:number;
}
