import { Component, Inject, OnInit } from '@angular/core';
import { ICliente } from '../../../modelos/cliente';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { Observable } from 'rxjs';
import { ILibro } from '../../../modelos/libro';
import { KeyValue } from '@angular/common';
import { IProvincia } from '../../../modelos/provincia';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IDatosPago } from '../../../modelos/datospago';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mostrarpedido',
  templateUrl: './mostrarpedido.component.html',
  styleUrl: './mostrarpedido.component.css',
})
export class MostrarpedidoComponent implements OnInit {
  public clientelogged$: Observable<ICliente | null>;
  public listaItemsPedido$: Observable<{ libroElemento: ILibro; cantidadElemento: number }[]>;
  public listaProvincias$ !: Observable<IProvincia[]> ;

  public checkDatosFacturacion:boolean=false;

  public datosPagoPedido : IDatosPago = {} as IDatosPago;


  public formDatosPedido : FormGroup;

  constructor(
    @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc: IStorageService,
    private restSvc: RestnodeService
  ) {
    this.listaItemsPedido$ = storageSvc.RecuperarItemsPedido();
    this.clientelogged$ = storageSvc.RecuperarDatosCliente();
    this.clientelogged$.forEach((c) => console.log(c));

    this.formDatosPedido =   new FormGroup(
      {
        datosEnvio : new FormGroup({
            calle: new FormControl('',Validators.required),
            cp: new FormControl('',Validators.required),
            pais: new FormControl('',Validators.required),
            provincia: new FormControl('',Validators.required),
            municipio: new FormControl('',Validators.required),
          nombreDestinatario: new FormControl('',Validators.required),
          apellidosDestinatario: new FormControl('',Validators.required),
          telefonoDestinatario: new FormControl('',Validators.required),
          emailDestinatario: new FormControl('',Validators.required),
          otrosDatos: new FormControl(''),
        }),
        datosPago: new FormGroup({
          metodoPago: new FormControl('',Validators.required),
          numeroTarjeta: new FormControl('',Validators.required),
          nombreBanco: new FormControl('',Validators.required),
          mesCaducidad: new FormControl('',Validators.required),
          anioCaducidad: new FormControl('',Validators.required),
          cvv: new FormControl('',Validators.required),
        })
      }
    );

  }

  ngOnInit(): void {
    this.listaProvincias$ = this.restSvc.RecuperarProvincias();
    this.listaProvincias$.forEach(p => console.log(p))
  }

  public ModificarItemPedido(
    datos: KeyValue<string, { libroElemento: ILibro; cantidadElemento: number }>
  ) {
    this.storageSvc.OperarItemsPedido(datos.value.libroElemento, datos.value.cantidadElemento, datos.key);
  }

  ShowDatosFacturacion(valor:boolean){
    this.checkDatosFacturacion = valor;
  }

  FinalizarPedido(){
    console.log('Pedido realizado y registrado...');
    console.log(this.formDatosPedido)
    if(this.formDatosPedido.valid){
      console.log(this.formDatosPedido.value)
      //hacer peticion al rest para hacer el pago segun el tipo de pago elegido
    }
  }

}
