import { Component, OnInit } from '@angular/core';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IRestMessage } from '../../../modelos/restMessage';

@Component({
  selector: 'app-paneltienda',
  templateUrl: './paneltienda.component.html',
  styleUrl: './paneltienda.component.css'
})
export class PaneltiendaComponent implements OnInit {
  public _listacategorias : {
    IdCategoria:string,
    NombreCategoria:string }[] = [];


    /**
     *
     */
    constructor( private restSvc : RestnodeService) {

    }

    async recuperarCategorias(){
      const _resp: IRestMessage = await this.restSvc.RecuperarCategorias();

      if(_resp.codigo === 0){
        this._listacategorias = _resp.otrosDatos.categorias;
        console.log('categorias recuperadas...',this._listacategorias)
      }
    }
  ngOnInit(): void {

    this.recuperarCategorias();
  }
}
