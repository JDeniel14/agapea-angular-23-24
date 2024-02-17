import { Component, Inject, OnInit } from '@angular/core';
import { ICliente } from '../../../modelos/cliente';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { Observable, Subscription, map, mergeMap } from 'rxjs';
import { ILibro } from '../../../modelos/libro';
import { KeyValue, Location } from '@angular/common';
import { IProvincia } from '../../../modelos/provincia';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IDatosPago } from '../../../modelos/datospago';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPedido } from '../../../modelos/pedido';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mostrarpedido',
  templateUrl: './mostrarpedido.component.html',
  styleUrl: './mostrarpedido.component.css',
})
export class MostrarpedidoComponent  {
  public listaItems$!:Observable<{libroElemento:ILibro, cantidadElemento:number}[]>;

  public subTotal$!:Observable<number>;
  public gastosEnvio:number=2; //dependera de provincia de direccion envio q esta en objeto datosPago y bla bla bla...

  public mensajeServer:string="";
  private subParams!: Subscription;
  private errorPedido:boolean = false;
  private datos : any;
  public clientelogged$?:Observable<ICliente|null>;

  public listaProvincias$!:Observable<IProvincia[]>;
  public showcompdatosfacturacion:boolean=false;
  public datosPago:IDatosPago={  tipodireccionenvio:'principal', tipoDireccionFactura: 'igualenvio', metodoPago:'tarjeta' };

   constructor( @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc:IStorageService,
                private restSvc:RestnodeService,
                private router: Router,
                private activatedRoute: ActivatedRoute){
      this.listaItems$=storageSvc.RecuperarItemsPedido()as Observable<Array<{libroElemento:ILibro, cantidadElemento:number}>>;
      this.subTotal$=this.listaItems$.pipe(
                                          map(
                                            (items:{ libroElemento:ILibro, cantidadElemento:number}[])=> items.reduce( (suma,item)=> suma + (item.libroElemento.Precio * item.cantidadElemento) ,0)
                                          )
                                          );
      this.listaProvincias$=restSvc.RecuperarProvincias();

      this.subParams= this.activatedRoute.queryParamMap.pipe(
        map((param)=> {
          let idcliente = param.get('idcliente')
          let idpedido = param.get('idpedido')
          if(idcliente !== ''){
            this.errorPedido = true;

            this.mensajeServer = `Error al realizar el pago del pedido...`

           this.datos = {idpedido:idpedido,
              idcliente:idcliente};

          }

        })
      ).subscribe();
   }

  public async Relog(){
    let _resp = await this.restSvc.ReLoginCliente(this.datos);
    if(_resp.codigo === 0){
      this.storageSvc.AlmacenarDatosCliente(_resp.datoscliente!);
      this.storageSvc.AlmacenarJWT(_resp.token!);

      this.clientelogged$=this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>;
    }

  }
   ShowCompDatosFacturacion(valor:boolean){
    this.showcompdatosfacturacion=valor;
   }

   ModficarItemPedido( item: [ {libroElemento: ILibro, cantidadElemento:number}, string ]){

    let _libro:ILibro=item[0].libroElemento;
    let _cantidad: number=item[0].cantidadElemento;

    switch (item[1]) {
      case 'sumar': _cantidad +=1; break;
      case 'restar': _cantidad -=1; break;
      case 'borrar': _cantidad=0;  break;
    }
    this.storageSvc.OperarItemsPedido(_libro,_cantidad, item[1] != 'borrar' ? 'modificar' : 'borrar');
   }

   FinalizarPedido(){
      console.log('finalzando...');

      let _pedidoActual:IPedido={
          idPedido: window.crypto.randomUUID(),
          fechaPedido: new Date(Date.now()),
          estadoPedido: 'pendiente de pago',
          elementosPedido: []  ,
          subtotal: 0,
          gastosEnvio: this.gastosEnvio,
          totalPedido: 0 + this.gastosEnvio,
          datosPago: this.datosPago
        };

        this.listaItems$.pipe(
          mergeMap(
            (items:Array<{libroElemento:ILibro, cantidadElemento:number}>) => {
                      _pedidoActual.elementosPedido=items;

                      let _subtotal=items.reduce( (s,i)=>s + (i.libroElemento.Precio * i.cantidadElemento), 0);
                      _pedidoActual.subtotal=_subtotal;
                      _pedidoActual.totalPedido=_subtotal + _pedidoActual.gastosEnvio;

                      return this.storageSvc.RecuperarDatosCliente() as Observable<ICliente>;
                    }
          )
    ).subscribe(
      async clientelog => {
                  console.log('datos a mandar a server...',{ pedido: _pedidoActual, email: clientelog!.cuenta.email});
                  let _resp=await this.restSvc.FinalizarPedido( _pedidoActual, clientelog!.cuenta.email);

                  if(_resp.codigo == 0){
                      let url= _resp.otrosdatos
                      console.log(url)

                    //this.location.go(url)
                    window.location.href = url;
                  }else{
                    this.mensajeServer = _resp.mensaje;
                  }
      }
    );


        }


        ngOnDestroy(): void {
          this.subParams?.unsubscribe();
          
        }

}

