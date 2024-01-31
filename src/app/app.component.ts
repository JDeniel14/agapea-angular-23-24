import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { Observable, Subscription, filter, map, tap } from 'rxjs';
import { MI_TOKEN_SERVICIOSTORAGE } from './servicios/injectiontokenstorageservices';
import { IStorageService } from './modelos/interfaceservicios';
import { ICliente } from './modelos/cliente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  public showPanel: string = ''; //<------ puede valer panelCliente si en url: /Cliente/Panel/....,
  //'panelTienda' si en url : /Tienda/....
  // y  '' si en url /Cliente/Login o Registro

  public subcriptorRuta: Subscription;
  public routerEvent$: Observable<RouterEvent>;
  public patron: RegExp = new RegExp(
    '(/Cliente/(Login|Registro)|/Tienda/MostrarPedido)',
    'g'
  ); //<--- la opcion "g" o "global" del metodo .match, lo q hace es q si cumple el patron la cadena, no extrae los segmentos del match, solo la cadena entera encontrada
  public patronPanelCliente: RegExp = new RegExp('(/Cliente/Panel/*)');
  public patronPanelTienda: RegExp = new RegExp('(/Tienda/)');

  public clienteLogged$: Observable<ICliente>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc: IStorageService
  ) {
    this.clienteLogged$ = this.storageSvc.RecuperarDatosCliente();
    this.clienteLogged$.forEach((c) => console.log('cliente...', c));
    this.routerEvent$ = this.router.events.pipe(
      tap(),
      map((ev) => ev as RouterEvent), //para transformar el observable en otro
      filter((ev, i) => ev instanceof NavigationStart) //operador para filtrar sobre los eventos y coger solo aquellos que cumplen la condicion
    );

    this.subcriptorRuta = this.routerEvent$.subscribe((ev) => {
      if (ev.url.match(this.patronPanelCliente)) {
        this.showPanel = 'panelCliente';
      } else if (ev.url.match(this.patronPanelTienda)) {
        this.showPanel = 'panelTienda';
      } else if (ev.url.match(this.patron)) {
        this.showPanel = '';
      }
    });
    //#region forma mia para detectar cambios en la url, ta bien pero lo vamos a hacer  de otra manera
    /* this.subcriptorRuta = this.router.events.subscribe( (ev) => {
        if(ev instanceof NavigationStart){
          console.log('ruta', ev.url)
          console.log('ruta[1],ruta[2]',ev.url.split('/')[1],ev.url.split('/')[2] )
          if(ev.url.split('/')[1] == 'Cliente' && ev.url.split('/')[2] == 'Panel'){

            this.showPanel = 'panelCliente';
            console.log(this.showPanel)
          }else if(ev.url.split('/')[1] == 'Tienda'){
            this.showPanel = 'panelTienda';
          }else{
            this.showPanel = '';
          }
        }
      });*/
    //#endregion

    //#region  forma 2
    /*this.subcriptorRuta = this.router.events.subscribe((ev)=> {
  if(ev instanceof NavigationStart){
    if(new RegExp("(/Cliente(Login|Registro)| /Tienda/MostrarPedido)").test(ev.url)){
      this.showPanel = '';
    }else{
      this.showPanel = new RegExp("/Cliente/Panel/*").test(ev.url) ? 'panelCliente' : 'panelTienda'
    }
  }
});*/
    //#endregion
  }
  ngOnDestroy(): void {
    if (this.subcriptorRuta) {
      this.subcriptorRuta.unsubscribe();
    }
  }
}
