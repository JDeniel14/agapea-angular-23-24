import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoria } from '../../../modelos/categoria';
import { RestnodeService } from '../../../servicios/restnode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-tienda',
  templateUrl: './panel-tienda.component.html',
  styleUrl: './panel-tienda.component.css',
})
export class PanelTiendaComponent {
  public listaCategorias$!: Observable<ICategoria[]>;

  /**
   *
   */
  constructor(restSvc: RestnodeService, router: Router) {
    this.listaCategorias$ = restSvc.RecuperarCategorias('raices');
  }
}
