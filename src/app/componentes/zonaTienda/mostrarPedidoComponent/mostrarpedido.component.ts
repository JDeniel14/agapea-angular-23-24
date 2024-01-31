import { Component, Inject } from '@angular/core';
import { ICliente } from '../../../modelos/cliente';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { Observable } from 'rxjs';
import { ILibro } from '../../../modelos/libro';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-mostrarpedido',
  templateUrl: './mostrarpedido.component.html',
  styleUrl: './mostrarpedido.component.css',
})
export class MostrarpedidoComponent {
  public clientelogged$: Observable<ICliente>;
  public listaItemsPedido$: Observable<{ libroElemento: ILibro; cantidadElemento: number }[]>;

  constructor(
    @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc: IStorageService
  ) {
    this.listaItemsPedido$ = storageSvc.RecuperarItemsPedido();
    this.clientelogged$ = storageSvc.RecuperarDatosCliente();
    this.clientelogged$.forEach((c) => console.log(c));
  }

  public ModificarItemPedido(
    datos: KeyValue<string, { libroElemento: ILibro; cantidadElemento: number }>
  ) {
    this.storageSvc.OperarItemsPedido(
      datos.value.libroElemento,
      datos.value.cantidadElemento,
      datos.key
    );
  }
}
