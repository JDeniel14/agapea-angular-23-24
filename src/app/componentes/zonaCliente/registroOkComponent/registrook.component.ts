import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestnodeService } from '../../../servicios/restnode.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, concatMap, interval, tap } from 'rxjs';
import { IRestMessage } from '../../../modelos/restMessage';

@Component({
  selector: 'app-registrook',
  templateUrl: './registrook.component.html',
  styleUrl: './registrook.component.css',
})
export class RegistrookComponent implements OnInit, OnDestroy {
  public mode: string | null = '';
  public oobCode: string | null = '';
  public apiKey: string | null = '';

  public mensajeServer: string = '';

 // public obsParams: Observable<string>;
  public subParams!: Subscription;
  /**
   *
   */
  constructor(
    private restSvc: RestnodeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
   // this.obsParams = new Observable<string>();
    this.subParams = new Subscription();
  }

  irALogin() {
    this.router.navigateByUrl('/Cliente/Login');
  }

  /*async ConfirmarEmail(mode: string, oobCode: string, apiKey: string) {
    const _respuesta: IRestMessage = await this.restSvc.OperarCuentaCliente(
      mode,
      oobCode,
      apiKey
    );

    if (_respuesta.codigo === 0) {
      this.mensajeServer = _respuesta.mensaje;

      console.log('respuesta servidor...', _respuesta);
    }
  }*/

  ngOnInit(): void {
    //la url que se manda desde firebase tiene este formato:
    // http://localhost:4200/Cliente/RegistroOk ? mode=verifyEmail &
    //                                            oobCode = .......codigo &
    //                                            apikey=....
    //¿como extraigo params. de la url en angular?? hacer un metodo en el servicio restnode llamado activar email
    //donde hay que pasarle todos los params.

    //#region // --------------------    CON OBJETO ROUTER   ----------------------

    /**
     * Para poder coger parametros de la url activa, podemos usar el objeto router, pasandole la ruta activa con el metodo router.url
     * para coger el parametro que queremos usamos la propiedad queryParams y entre [] le pasamos el nombre del parametro
     */

    /* this.mode = this.router.parseUrl(this.router.url).queryParams['mode'];
    this.oobCode = this.router.parseUrl(this.router.url).queryParams['oobCode'];
    this.apiKey = this.router.parseUrl(this.router.url).queryParams['apiKey'];
*/

    //#endregion

    //#region --------------------- CON OBJETO ACTIVATEDROUTE Y SNAPSHOT

    /*  let _mode:string | null = this.activatedRoute.snapshot.queryParamMap.get('mode');
       let _oobCode:string | null = this.activatedRoute.snapshot.queryParamMap.get('oobCode');
       let _apiKey:string | null = this.activatedRoute.snapshot.queryParamMap.get('apiKey');

       let _resp:IRestMessage = this.restSvc.OperarCuentaCliente(_mode,_oobCode,_apiKey)
*/
    //#endregion



    //#region  --------------------  CON   OBJETO ACTIVATEDROUTE   ----------------------

    /**
     * Tambien se podria hacer con el objeto ActivatedRoute, a este hay que hacer la subscipcion y al destruir? el unsubscribe
     * este objeto da info sobre la ruta asociada al componente, cuenta tambien con el metodo queryParams, no es necessario pasarle antes
     * la url actual, ya que la tiene, te subscribes, por cada param. sacas el parametro con la el parametro que recorremos
     * ---> params['nombre_param']
     */
   /* this.subParams = this.activatedRoute.queryParams.subscribe((params) => {
      this.mode = params['mode'];
      this.oobCode = params['oobCode'];
      this.apiKey = params['apiKey'];
    });

    console.log(
      'valores parametros url...',
      this.mode,
      this.oobCode,
      this.apiKey
    );

    this.ConfirmarEmail(this.mode, this.oobCode, this.apiKey);*/
     //#endregion

     // Usando parametros obtenidos del observable que nos da el servicio ActivatedRoute (detectas cambios constantes en la url):
      /**
       * Formato observer, objeto que recibe el metodo subscribe de un observable:
      */
     //#region   --------------------  CON   OBJETO ACTIVATEDROUTE  profe  ----------------------

/*
     this.activatedRoute.queryParamMap.subscribe(
      {
        next:(dato)=>{}, <---- generalmente, solo se pone esta en la subscripcion
        error:(error)=>{},
        complete:()=>{}
      }
     );*/
     //#endregion

     //para manejar observables anidados (nested-observables, manejar operadores: concatMap, mergeMap, switchMap, exhaustMap)
     /**
      * ConcatMap -> coge uno y espera que acabe, coge otro y espera que acabe, etc, no muestra el siguiente valor hasta que no acabe el observable por el que va
      * MegeMap -> Fusiona los observables, da todos los valores de los observables mezclados
      * SwitchMap -> salta de un observable a otro, recibes datos del primero, si recibe datos de otro observable cambia a ese observable
      * exhaustMap -> Es parecido al SwitchMap, pero hasta que no se completan los valores del observable no cambia de observable
      */
   /* this.subParams = this.activatedRoute.queryParamMap.subscribe(
      (parametros:ParamMap)=>{
        let _mode:string|null =parametros.get('mode');
        let _oobCode:string|null = parametros.get('oobCode');
        let _apiKey :string|null = parametros.get('apiKey');

        this.restSvc.OperarCuentaCliente(_mode,_oobCode,_apiKey).subscribe(
          (resp:IRestMessage)=>{
            if(resp.codigo === 0){
              this.mensajeServer = resp.mensaje;
              this.router.navigateByUrl('/Cliente/Login');
            }else{
              //mostrar mensajes de error en vista (fallo activacion)

            }
          }
        );
      }
     );*/

     this.subParams = this.activatedRoute
                          .queryParamMap
                          .pipe(
                              tap((parametros:ParamMap) =>
                                console.log('parametros en la url....', parametros.keys)),
                                concatMap( (parametros:ParamMap) => {
                                let _mode:string|null =parametros.get('mode');
                                let _oobCode:string|null = parametros.get('oobCode');
                                let _apiKey :string|null = parametros.get('apiKey');

                                return this.restSvc.ActivarCuenta(_mode,_oobCode,_apiKey)
                              } )
                        ).subscribe( (resp:IRestMessage) => {
                          if(resp.codigo === 0){
                            this.mensajeServer = resp.mensaje;
                            this.router.navigateByUrl('/Cliente/Login');
                          }else{
                            this.mensajeServer = resp.mensaje;
                          }
                        });
                        
  }

  ngOnDestroy(): void {
    if (this.subParams) {
      this.subParams.unsubscribe();
    }
  }
}
