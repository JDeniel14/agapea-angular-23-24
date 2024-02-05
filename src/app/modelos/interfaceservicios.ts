import { Observable } from "rxjs";
import { ICliente } from "./cliente";
import { ILibro } from "./libro";

export interface IStorageService{

  //#region metodos sincronos
   AlmacenarDatosCliente(datoscliente:ICliente):void;
   AlmacenarJWT(jwt:string):void;
   RecuperarDatosCliente():Observable<ICliente | null>;  //<--- lo podiamos hacer devolviendo valor de tipo icliente como en blazor, pero con el observable aprovechamos pipe async
   RecuperarJWT():Observable<string>; //<--- lo podiamos hacer devolviendo valor de tipo string como en blazor, pero con el observable aprovechamos pipe async
   OperarItemsPedido(libro:ILibro, cantidad:number, operacion : string):void
   RecuperarItemsPedido():Observable<{libroElemento: ILibro, cantidadElemento:number}[]>;
  //#endregion

  //#region metodos asincronos para servicio indexedDB
  /*AlmacenarDatosClienteAsync(datoscliente:ICliente):Observable<>;
  AlmacenarJWTAsync(jwt:string):Observable<>;
  RecuperarDatosClienteAsync():Observable<ICliente>;
  RecuperarJWTAsync():Observable<string>;
  *///#endregion
}
