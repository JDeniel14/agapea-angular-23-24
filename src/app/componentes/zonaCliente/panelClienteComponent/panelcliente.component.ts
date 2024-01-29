import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panelcliente',
  templateUrl: './panelcliente.component.html',
  styleUrl: './panelcliente.component.css'
})
export class PanelclienteComponent implements OnInit {

  public _listacategorias : string[] = ["Inicio Panel", "Mis Compras", "Mis Opiniones", "Mis Listas"];

  /**
   *
   */
  constructor() {

  }
  ngOnInit(): void {
    
  }
}
