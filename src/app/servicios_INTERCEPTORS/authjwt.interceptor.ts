import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subscription, concatMap, first, last, map, mergeMap, take, tap } from 'rxjs';
import { MI_TOKEN_SERVICIOSTORAGE } from '../servicios/injectiontokenstorageservices';
import { IStorageService } from '../modelos/interfaceservicios';

@Injectable()
export class AuthjwtInterceptor implements HttpInterceptor, OnDestroy {
  public subAuth : Subscription = new Subscription;
  //Interceptor para añadir en todas las pet. ajax HTTP-REQUEST a servicio de nodejs la cabecera
  // Authentication: Bearer ..jwt..
  //si no hay jwt almacenado en servicio IStorage, no cambia pet.original
  constructor(@Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSVC:IStorageService) {

  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return this.storageSVC
    .RecuperarJWT()
    .pipe(
      tap((jwt: string) => console.log('estamos en INTERCEPTOR para intentar añadir JWT en cabecera...->', jwt)),
      first(),
      concatMap(jwt => {
        // Si el JWT no está vacío, agregamos la cabecera de autorización
        if (jwt != null || jwt != '') {
          const _reqclonada = request.clone({
            setHeaders: { Authorization: `Bearer ${jwt}` }
          });
          return next.handle(_reqclonada);
        } else {
          // Si el JWT está vacío, continuamos sin la cabecera
          return next.handle(request);
        }
      })
    );




  }

  ngOnDestroy(): void {
   this.subAuth.unsubscribe()
  }
}
