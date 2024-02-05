import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ILibro } from '../../../modelos/libro';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-elementopedido',
  templateUrl: './elementopedido.component.html',
  styleUrl: './elementopedido.component.css',
})
export class ElementopedidoComponent {
  @Input() public elemento: {
    libroElemento: ILibro;
    cantidadElemento: number;} = {} as { libroElemento: ILibro; cantidadElemento: number };

  @Output() public operarElemEvent: EventEmitter<KeyValue<string, { libroElemento: ILibro; cantidadElemento: number }>> = new EventEmitter<KeyValue<string, { libroElemento: ILibro; cantidadElemento: number }>>();

  constructor(
    @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc: IStorageService
  ) {
    console.log('elemento en pedido ->', this.elemento);
  }

  public OperarElemento(operacion: string) {
    switch (operacion) {
      case 'sumar':
        this.elemento.cantidadElemento += 1;

        break;
      case 'restar':
        this.elemento.cantidadElemento -= 1;

        break;

      case 'borrar':
        this.elemento.cantidadElemento = 0;

        break;
      default:
        break;
    }
    operacion = operacion != "borrar" ? "modificar" : operacion;
    this.operarElemEvent.emit({ key: operacion, value: this.elemento });
  }
}
