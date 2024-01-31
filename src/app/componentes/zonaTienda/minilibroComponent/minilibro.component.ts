import { Component, Inject, Input } from '@angular/core';
import { ILibro } from '../../../modelos/libro';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minilibro',
  templateUrl: './minilibro.component.html',
  styleUrl: './minilibro.component.css',
})
export class MinilibroComponent {
  @Input() public libroAPintar!: ILibro;

  constructor(
    @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc: IStorageService,
    private route : Router
  ) {

  }

  public AddLibroPedido() {
    this.storageSvc.OperarItemsPedido(this.libroAPintar,1,"añadir");
    this.storageSvc.RecuperarItemsPedido().forEach(it => console.log(it))
    this.route.navigateByUrl("/Tienda/MostrarPedido")
  }
}
