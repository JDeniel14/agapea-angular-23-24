import { Component } from '@angular/core';
import { ILibro } from '../../../modelos/libro';
import { RestnodeService } from '../../../servicios/restnode.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css',
})
export class LibrosComponent {
  // public listaLibros: ILibro[] = []; //no  lo quiero, quiero usar un observable ILibro[] que me da el servicio con pipe async
  public listaLibrosEvent$: Observable<ILibro[]>;
  /**
   *
   */
  constructor(
    private restSvc: RestnodeService,
    private activatedRoute: ActivatedRoute
  ) {
    //recuperamos de la url el semento donde va el idcat de los libros a recuperar....
    // /tienda/libros/2-10
    //#region forma pocha de ver parametro y recuperar libros
    /*this.subRoute = this.activatedRoute
                        .paramMap
                        .subscribe(
                        (param: ParamMap)=>{
                          let _idcat = param.get('idcat') || '2-10';
                          this.restSvc
                              .RecuperarLibros(_idcat)
                              .subscribe(
                            (datos: ILibro[])=> this.listaLibros = datos
                          );
                        }
                    );*/
    //paramMap porque es un segmento de la url, si fuera de query seria ?var=valor
    //#endregion

    //#region  otra forma
    /*this.activatedRoute
                  .paramMap
                  .subscribe(
                        (param: ParamMap)=>{ // <--- ???? nested, mejor con un switch map
                          let _idcat = param.get('idcat') || '2-10';
                          this.restSvc
                              .RecuperarLibros(_idcat)
                              .subscribe(
                            (datos: ILibro[])=> this.listaLibros = datos
                          );
                        }
                    );*/

    //#endregion
    this.listaLibrosEvent$ = this.activatedRoute.paramMap.pipe(
      switchMap((param) => {
        let idcat = param.get('idcat') || '2-10';
        return this.restSvc.RecuperarLibros(idcat);
      })
    );
  }
}
