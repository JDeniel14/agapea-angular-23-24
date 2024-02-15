import { Injectable, effect, signal } from '@angular/core';
import { IStorageService } from '../modelos/interfaceservicios';
import { Observable } from 'rxjs';
import { ICliente } from '../modelos/cliente';
import { ILibro } from '../modelos/libro';

@Injectable({
  providedIn: 'root'
})
export class SignalsStorageService implements IStorageService {

  private _clienteSignal = signal<ICliente | null>(null);
  private _jwtSignal = signal<string>("");
  private _elementosPedidoSignal = signal<Array<{ libroElemento: ILibro; cantidadElemento: number }>>([]);

  constructor() {

   }

  AlmacenarDatosCliente(datoscliente: ICliente): void {
    this._clienteSignal.update(()=> datoscliente);
  }
  AlmacenarJWT(jwt: string): void {
    this._jwtSignal.update(()=> jwt);
  }
  RecuperarDatosCliente(): Observable<ICliente | null> | ICliente | null {
    return this._clienteSignal();
  }
  RecuperarJWT(): Observable<string> |string {
    return this._jwtSignal();
  }
  OperarItemsPedido(libro: ILibro, cantidad: number, operacion: string): void {
    this._elementosPedidoSignal.update(
      items => {
        let _posElem:number = items.findIndex(el => el.libroElemento.ISBN13 === libro.ISBN13);

        switch (operacion) {
          case "añadir":
            if(_posElem != -1){
              //el libro existe, incremento
              items[_posElem].cantidadElemento+= cantidad;
            }else{
              items.push({libroElemento:libro,cantidadElemento:1});
            }

            break;

            case "borrar":
              if(_posElem != -1){
                items = items.filter((elem)=> elem.libroElemento.ISBN13 !== libro.ISBN13);
              }
              break;

            case "modificar":
              if(_posElem != -1){
                if(items[_posElem].cantidadElemento != 0){
                  items[_posElem].cantidadElemento = cantidad;
                }else{
                  items = items.filter((elem)=> elem.libroElemento.ISBN13 !== libro.ISBN13);
                }
              }

            break;
          default:
            break;
        }
        return items;
      }
    );

  }
  RecuperarItemsPedido(): Observable<{ libroElemento: ILibro; cantidadElemento: number; }[] > | Array<{ libroElemento: ILibro; cantidadElemento: number; }> {
    return this._elementosPedidoSignal();
  }
}
