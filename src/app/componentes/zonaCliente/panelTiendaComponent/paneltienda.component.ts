import { Component, OnInit } from '@angular/core';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IRestMessage } from '../../../modelos/restMessage';
import { ActivatedRoute, NavigationStart, Router,  } from '@angular/router';

@Component({
  selector: 'app-paneltienda',
  templateUrl: './paneltienda.component.html',
  styleUrl: './paneltienda.component.css'
})
export class PaneltiendaComponent implements OnInit {
  public _listacategorias : {
    IdCategoria:string,
    NombreCategoria:string }[] = [];

    public idCat: string = '';

    /**
     *
     */
    constructor( private restSvc : RestnodeService, private route: Router, private activatedRoute: ActivatedRoute) {



    }

    async recuperarCategorias(id?:string){
      const _resp: IRestMessage = await this.restSvc.RecuperarCategorias(id);

      if(_resp.codigo === 0){
        console.log(_resp)
        this._listacategorias = _resp.otrosdatos.categorias;
        console.log('categorias recuperadas...',this._listacategorias)
      }
    }
  ngOnInit(): void {

    this.route.events.subscribe((ev) =>{
      if(ev instanceof NavigationStart){
        console.log('cambio en ruta? ',ev.url);
        const [pathname,queryString] =ev.url.split('?');
        const paramsUrl = new URLSearchParams(queryString);
        const paramIdCat = paramsUrl.get('id');
        console.log('id categoria...',paramIdCat);

        console.log('holi categorais')
        this.recuperarCategorias();
      }else{
        this.recuperarCategorias();
      }
    })

  }
}
