import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//----------------- modulos secundarios hijos del modulo principal de la aplicacion ---------------------------
import { AppRoutingModule } from './app-routing.module';

//HttpClientModule: modulo encargado de dar inyeccion de servicios comuner para hacer pet.HTTP externas
//usando servicio HttpClient... tb permite definicion de INTERCEPTORS (inter. son servicios que intercepta una solicitud, la transforma y la manda)
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//ReactiveFormsModule: modulo donde se definen directivas a usar en vistas de componente para mapear objetos FormGroup y FormControl
//contra elementos del dom (directivas formGroup y formControlName)
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

//--------------- componentes del modulo principal de la aplicacion----------------------------
import { AppComponent } from './app.component';
import { PanelclienteComponent } from './componentes/zonaCliente/panelClienteComponent/panelcliente.component';
import { PanelTiendaComponent } from './componentes/zonaTienda/panelTiendaComponent/panel-tienda.component';



//----------------- directivas del modulo principal de la aplicacion--------------------------


//----------------- pipes del modulo principal de la aplicacion-------------------------------

//----------------- servicios del modulo principal de la aplicacion---------------------------
import { RestnodeService } from './servicios/restnode.service';



import { SubjectStorageService } from './servicios/subject-storage.service';
import { MI_TOKEN_SERVICIOSTORAGE } from './servicios/injectiontokenstorageservices';


import { AuthjwtInterceptor } from './servicios_INTERCEPTORS/authjwt.interceptor';

import { ZonaTiendaRoutingModule } from './modulos_zonas/zona-tienda-routing.module';
import { ZonaclienteRoutingModule } from './modulos_zonas/zonacliente-routing.module';











@NgModule({
  declarations: [ //<---- array con defs. de componentes, directivas y pipes disponibles para toda la aplicacion
    AppComponent,
    PanelclienteComponent,
    PanelTiendaComponent,




  ],
  imports: [ //<------- array con la definicion de los modulos secundarios que la aplicacion va a usar
  //BrowserModule, crea la estructura necesaria  ?
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
//<--- AppRoutingModule, se encarga de detectar variaciones de url en navegador y en funcion de su fich. de configuracion: app-routing.module.ts
// carga un componente u otro
    AppRoutingModule,
    FormsModule,
    ZonaTiendaRoutingModule, // <---- SI HACES LAZY LOADING, LOS MODULOS DE ENRUTAMIENTO DE LOS HIJOS HAY QUE METERLOS, SINO CASCA TODO
    ZonaclienteRoutingModule
  ],
  /**
   * Los servicios son importantes. En angular no hay contexto global, se hace mediante servicios. Si algun componente necesita
   * un valor, el servicio se lo da.
   * Estos comunican los componentes sin relacion directa
   */
  providers: [
    RestnodeService,
    {provide: MI_TOKEN_SERVICIOSTORAGE, useClass: SubjectStorageService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthjwtInterceptor, multi: true}
], // <---- array para definir inyeccion de dependencias de servicios usados por componentes
  bootstrap: [AppComponent]
})
export class AppModule { }
/**
 Al poner el @ habilita la clase TypeScript para que sea un modulo de Angular.
 El @ es como una funcion que agrega atributos especiales.

 */
