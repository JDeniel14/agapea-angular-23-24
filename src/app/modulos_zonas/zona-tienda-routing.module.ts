import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from '../componentes/zonaTienda/librosComponent/libros.component';
import { DetalleslibroComponent } from '../componentes/zonaTienda/mostrarDetallesLibroComponent/detalleslibro.component';
import { MostrarpedidoComponent } from '../componentes/zonaTienda/mostrarPedidoComponent/mostrarpedido.component';
import { AccesoPedidoGuard } from '../servicios_GUARDS/acceso-pedido.guard';

const routes: Routes = [
  {
    path: 'Tienda',
    children: [
      {path: 'Libros/:idcat?', component: LibrosComponent},
      {path : 'MostrarLibro/:isbn', component:DetalleslibroComponent },
      {path: 'MostrarPedido', component:MostrarpedidoComponent, canActivate:[AccesoPedidoGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaTiendaRoutingModule { }
