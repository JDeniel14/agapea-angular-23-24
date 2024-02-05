import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, last, map, tap } from 'rxjs';
import { MI_TOKEN_SERVICIOSTORAGE } from '../servicios/injectiontokenstorageservices';
import { IStorageService } from '../modelos/interfaceservicios';
import { ICliente } from '../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class AccesoPedidoGuard implements CanActivate { //<--- debe ser canActivate porque este comprueba si la ruta especifica
                                                             // a la que añadimos en el routing la clase puede o no ser activada
                                                            //con CanActivateChild hay que indicarlo en la ruta padre y el guard
                                                            //comprueba todas de los hijos a menos que expecifiques ruta de alguna forma?
  constructor(@Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSVC: IStorageService,
              private router : Router
              ) {


  }

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.storageSVC
                .RecuperarDatosCliente()
                .pipe(
                   // last(), <--- no podemos usar last porque si no devuelve algo el servicio o lo que devuelve es vacio, no actua?
                   tap((datos:ICliente |null)=> console.log('datos del cliente pasados al GUARD...',datos)),
                    map(datos => {return datos != null ? true : this.router.parseUrl('/Cliente/Login')})
                  );

      /* .subscribe(
        datos => {
          console.log('ACTUANDO EL GUARD...');
          return datos != null ? true : this.router.navigateByUrl('/Cliente/Login')
        }
      ); <---- esto no lo puedo hacer porque suscribe no recibe los datos de forma sincrona, no va a devolver un boolean o urltree
                inmediato, sino que puede tardar.... tengo que devolver un Observable o promesa;
                transformo el observable del servicio .RecuperarDatosCliente(): Observable<Icliente |null> <====> Observable<boolean|urltree>     */

  }

}
