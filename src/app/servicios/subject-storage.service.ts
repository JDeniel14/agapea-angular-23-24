import { Injectable } from '@angular/core';
import { IStorageService } from '../modelos/interfaceservicios';
import { ICliente } from '../modelos/cliente';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILibro } from '../modelos/libro';

@Injectable({
  providedIn: 'root',
})
export class SubjectStorageService implements IStorageService {
  private _clienteSubject$: BehaviorSubject<ICliente | null> = new BehaviorSubject<ICliente | null>(null);
  private _jwtSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _elementosPedidoSubject$: BehaviorSubject<{ libroElemento: ILibro; cantidadElemento: number }[]> = new BehaviorSubject<{ libroElemento: ILibro; cantidadElemento: number }[]>([]);

  constructor() {}

  AlmacenarDatosCliente(datoscliente: ICliente): void {
    this._clienteSubject$.next(datoscliente);
  }
  AlmacenarJWT(jwt: string): void {
    this._jwtSubject$.next(jwt);
  }
  RecuperarDatosCliente(): Observable<ICliente | null > {
    return this._clienteSubject$.asObservable(); //devuelvo el observable
  }
  RecuperarJWT(): Observable<string> {
    return this._jwtSubject$.asObservable();
  }

  OperarItemsPedido(libro: ILibro, cantidad: number, operacion: string): void {
    //con la propiedad .value del subject te ahorras tener una variable intermedia y subscribirte al observable
    let _posItem = this._elementosPedidoSubject$.value.findIndex(
      (item) => item.libroElemento.ISBN13 === libro.ISBN13);
    switch (operacion) {
      case 'añadir':
        if (_posItem != -1) {
          this._elementosPedidoSubject$.value[_posItem].cantidadElemento +=cantidad;
        } else {
          this._elementosPedidoSubject$.value.push({
            libroElemento: libro,
            cantidadElemento: 1,
          });
        }
        break;

      case 'borrar':
        if (_posItem != -1) {
          this._elementosPedidoSubject$.value.splice(_posItem, 1);
        }
        break;

      case 'modificar':
        if (_posItem != -1) {
          if (
            this._elementosPedidoSubject$.value[_posItem].cantidadElemento != 0
          ) {
            this._elementosPedidoSubject$.value[_posItem].cantidadElemento =cantidad;
          } else {
            this._elementosPedidoSubject$.value.splice(_posItem, 1);
          }
        }
        break;

      default:
        break;
    }
  }
  RecuperarItemsPedido(): Observable<{ libroElemento: ILibro; cantidadElemento: number }[]> {
    return this._elementosPedidoSubject$.asObservable();
  }
}
