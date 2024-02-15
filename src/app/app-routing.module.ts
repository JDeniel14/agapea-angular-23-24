import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/zonaCliente/registroComponent/registro.component';
import { LoginComponent } from './componentes/zonaCliente/loginComponent/login.component';
import { RegistrookComponent } from './componentes/zonaCliente/registroOkComponent/registrook.component';
import { LibrosComponent } from './componentes/zonaTienda/librosComponent/libros.component';
import { DetalleslibroComponent } from './componentes/zonaTienda/mostrarDetallesLibroComponent/detalleslibro.component';
import { MostrarpedidoComponent } from './componentes/zonaTienda/mostrarPedidoComponent/mostrarpedido.component';
import { AccesoPedidoGuard } from './servicios_GUARDS/acceso-pedido.guard';


// modulo principal de entutamiento usado por el modulo global de la aplicacion app.module.ts
//necesitan tener definidos un array de objetos de tipo interface Route
/**
 * Los Route son interfaces.
 * En angular el modelado de datos se hace con interfaces
 */
const routes: Routes = [
  {
    path: 'Cliente',loadChildren: ()=> import('./modulos_zonas/zonacliente.module').then(m => m.ZonaclienteModule )
  },
  {
    path: 'Tienda', loadChildren: ()=> import('./modulos_zonas/zona-tienda.module').then(m => m.ZonaTiendaModule)
  },
  { path: '', redirectTo: '/Tienda/Libros/2-10', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
