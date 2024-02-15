import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'




//-------- componentes a importar por este modulo -------------------
import{LoginComponent} from '../componentes/zonaCliente/loginComponent/login.component'
import{RegistroComponent} from '../componentes/zonaCliente/registroComponent/registro.component'
import{RegistrookComponent} from '../componentes/zonaCliente/registroOkComponent/registrook.component'
import { InicioPanelComponent } from '../componentes/zonaCliente/inicioPanelComponent/inicio-panel.component';
import { EmailfilterdomainDirective } from '../directivas/emailfilterdomain.directive';

import { ComprobacionexisteemailDirective } from '../directivas/comprobacionexisteemail.directive';
import { RouterModule } from '@angular/router';
import { ZonaclienteRoutingModule } from './zonacliente-routing.module';
import { ModalDireccionesComponent } from '../componentes/zonaCliente/modalDireccionesComponent/modal-direcciones.component';
import { MiniDireccionComponent } from '../componentes/zonaCliente/miniDireccionComponent/mini-direccion.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RegistrookComponent,
    InicioPanelComponent,
  ComprobacionexisteemailDirective,
  EmailfilterdomainDirective,
  ModalDireccionesComponent,
  MiniDireccionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ZonaclienteRoutingModule
  ]
})
export class ZonaclienteModule { }
