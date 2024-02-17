import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, concatMap, map, switchMap } from 'rxjs';
import { RestnodeService } from '../../../servicios/restnode.service';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ICliente } from '../../../modelos/cliente';
import { IPedido } from '../../../modelos/pedido';

@Component({
  selector: 'app-finalizar-pedido-ok',
  templateUrl: './finalizar-pedido-ok.component.html',
  styleUrl: './finalizar-pedido-ok.component.css'
})
export class FinalizarPedidoOKComponent implements OnDestroy {

  private idcliente:string="";
  private idpedido:string="";

  private subParams?: Subscription;

  private datos:any;

  public clientelogged$!:Observable<ICliente | null> ;
  public pedido?:IPedido;
  private subCliente!: Subscription;
  /**
   *
   */
  constructor(private activatedRoute:ActivatedRoute, private restSvc: RestnodeService,
              @Inject(MI_TOKEN_SERVICIOSTORAGE)private storageSvc: IStorageService) {

   this.subParams= this.activatedRoute.queryParamMap.pipe(
      map((param)=> {
        this.idcliente =param.get('idcliente') ?? "";
        this.idpedido =param.get('idpedido') ?? "";
        console.log('param',param)
      })
    ).subscribe();


       this.datos = {idpedido:this.idpedido,
                  idcliente:this.idcliente}
      console.log(this.datos)
        this.Relog()
  }

  public async Relog(){
    let _resp =  await this.restSvc.ReLoginCliente(this.datos);

    console.log(_resp)

    if(_resp.codigo == 0){
      console.log('datos del cliente...', _resp.datoscliente)

      this.storageSvc.AlmacenarDatosCliente(_resp.datoscliente!)
      this.storageSvc.AlmacenarJWT(_resp.token!)

      this.clientelogged$=this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>;
     this.subCliente = this.clientelogged$.pipe(
        map(datos=> {
          this.pedido = datos?.pedidos?.find(p => p.idPedido == this.idpedido);
        })
      ).subscribe();
    }
  }
  ngOnDestroy(): void {
    this.subParams?.unsubscribe();
    this.subCliente.unsubscribe();
  }


}
