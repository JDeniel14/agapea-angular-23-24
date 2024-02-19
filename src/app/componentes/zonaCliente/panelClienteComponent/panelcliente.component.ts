import { Component, Inject, OnInit } from '@angular/core';
import { ICliente } from '../../../modelos/cliente';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';

@Component({
  selector: 'app-panelcliente',
  templateUrl: './panelcliente.component.html',
  styleUrl: './panelcliente.component.css',
})
export class PanelclienteComponent implements OnInit {
  public _listacategorias: string[] = [
    'Inicio Panel',
    'Mis Compras',
    'Mis Opiniones',
    'Mis Listas',
  ];

  public clienteLog :ICliente = {} as ICliente;

  /**
   *
   */
  constructor(@Inject(MI_TOKEN_SERVICIOSTORAGE)private storageSvc:IStorageService) {


  }
  ngOnInit(): void {
    console.log(this.clienteLog)
    this.clienteLog = this.storageSvc.RecuperarDatosCliente() as ICliente;

  }
}
