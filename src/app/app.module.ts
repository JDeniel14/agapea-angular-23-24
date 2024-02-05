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
import { RegistroComponent } from './componentes/zonaCliente/registroComponent/registro.component';
import { LoginComponent } from './componentes/zonaCliente/loginComponent/login.component';




//----------------- directivas del modulo principal de la aplicacion--------------------------
import { EmailfilterdomainDirective } from './directivas/emailfilterdomain.directive';

import { ComprobacionexisteemailDirective } from './directivas/comprobacionexisteemail.directive';

//----------------- pipes del modulo principal de la aplicacion-------------------------------

//----------------- servicios del modulo principal de la aplicacion---------------------------
import { RestnodeService } from './servicios/restnode.service';
import { RegistrookComponent } from './componentes/zonaCliente/registroOkComponent/registrook.component';
import { PanelclienteComponent } from './componentes/zonaCliente/panelClienteComponent/panelcliente.component';

import { RedondeocantidadPipe } from './pipes/redondeocantidad.pipe';
import { LibrosComponent } from './componentes/zonaTienda/librosComponent/libros.component';
import { DetalleslibroComponent } from './componentes/zonaTienda/mostrarDetallesLibroComponent/detalleslibro.component';
import { MinilibroComponent } from './componentes/zonaTienda/minilibroComponent/minilibro.component';
import { PanelTiendaComponent } from './componentes/zonaTienda/panelTiendaComponent/panel-tienda.component';
import { SubjectStorageService } from './servicios/subject-storage.service';
import { MI_TOKEN_SERVICIOSTORAGE } from './servicios/injectiontokenstorageservices';
import { MostrarpedidoComponent } from './componentes/zonaTienda/mostrarPedidoComponent/mostrarpedido.component';
import { ElementopedidoComponent } from './componentes/zonaTienda/miniElementoPedidoComponent/elementopedido.component';
import { DatosenvioComponent } from './componentes/zonaTienda/datoEnvioComponent/datosenvio.component';
import { DatosfacturacionComponent } from './componentes/zonaTienda/datosFacturacionComponent/datosfacturacion.component';
import { DatospagoComponent } from './componentes/zonaTienda/datosPagoComponent/datospago.component';
import { AuthjwtInterceptor } from './servicios_INTERCEPTORS/authjwt.interceptor';








@NgModule({
  declarations: [ //<---- array con defs. de componentes, directivas y pipes disponibles para toda la aplicacion
    AppComponent,
    RegistroComponent,
    LoginComponent,
    EmailfilterdomainDirective,
    ComprobacionexisteemailDirective,
    RegistrookComponent,
    PanelclienteComponent,
    RedondeocantidadPipe,
    LibrosComponent,
    DetalleslibroComponent,
    MinilibroComponent,
    PanelTiendaComponent,
    MostrarpedidoComponent,
    ElementopedidoComponent,
    DatosenvioComponent,
    DatosfacturacionComponent,
    DatospagoComponent,






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
