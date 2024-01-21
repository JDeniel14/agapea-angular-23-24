import { Component } from '@angular/core';

@Component({
  selector: 'app-panelcliente',
  templateUrl: './panelcliente.component.html',
  styleUrl: './panelcliente.component.css'
})
export class PanelclienteComponent {

  public _listacategorias : {
    IdCategoria:string,
    NombreCategoria:string }[] = [];

  /**
   *
   */
  constructor() {

  }
}
