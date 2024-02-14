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
  @Input() public elemento!:{libroElemento:ILibro, cantidadElemento:number};
  @Output() public operarItemEvent:EventEmitter< [ {libroElemento:ILibro, cantidadElemento:number}, string ] >=new EventEmitter< [ {libroElemento:ILibro, cantidadElemento:number}, string ] >();

  public OperarItem(operacion:string){
    this.operarItemEvent.emit( [ this.elemento, operacion ] );
  }
}
