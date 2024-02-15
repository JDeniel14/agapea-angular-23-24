import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonaTiendaRoutingModule } from './zona-tienda-routing.module';

import { LibrosComponent } from '../componentes/zonaTienda/librosComponent/libros.component';
import { DetalleslibroComponent } from '../componentes/zonaTienda/mostrarDetallesLibroComponent/detalleslibro.component';
import { MinilibroComponent } from '../componentes/zonaTienda/minilibroComponent/minilibro.component';
import { PanelTiendaComponent } from '../componentes/zonaTienda/panelTiendaComponent/panel-tienda.component';
import { ElementopedidoComponent } from '../componentes/zonaTienda/miniElementoPedidoComponent/elementopedido.component';
import { DatosenvioComponent } from '../componentes/zonaTienda/datoEnvioComponent/datosenvio.component';
import { DatosfacturacionComponent } from '../componentes/zonaTienda/datosFacturacionComponent/datosfacturacion.component';
import { DatospagoComponent } from '../componentes/zonaTienda/datosPagoComponent/datospago.component';
import { MostrarpedidoComponent } from '../componentes/zonaTienda/mostrarPedidoComponent/mostrarpedido.component';
import { RedondeocantidadPipe } from '../pipes/redondeocantidad.pipe';

@NgModule({
  declarations: [
    LibrosComponent,
    DetalleslibroComponent,
    MinilibroComponent,
    ElementopedidoComponent,
    DatosenvioComponent,
    DatosfacturacionComponent,
    DatospagoComponent,
    MostrarpedidoComponent,
    RedondeocantidadPipe,
  ],
  imports: [
    CommonModule,
    ZonaTiendaRoutingModule,
  ]
})
export class ZonaTiendaModule { }
