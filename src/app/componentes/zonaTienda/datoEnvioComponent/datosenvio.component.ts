import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { Observable, Subscription } from 'rxjs';
import { ICliente } from '../../../modelos/cliente';
import { IDireccion } from '../../../modelos/direccion';
import { IProvincia } from '../../../modelos/provincia';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IMunicipio } from '../../../modelos/municipio';
import { IDatosPago } from '../../../modelos/datospago';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datosenvio',
  templateUrl: './datosenvio.component.html',
  styleUrl: './datosenvio.component.css',
})
export class DatosenvioComponent implements OnDestroy, OnChanges, OnInit {
  @Input()listaProvincias$!:Observable<IProvincia[]>;
  @Input() datosPagoPedido!:IDatosPago | null;
  @Input() formDatosPedido!:FormGroup;
  @Output() checkdatosFacturacionEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public formDatosEnvio!: FormGroup;

  public datosCliente!: ICliente | null;
  public direccioprincipal: IDireccion | undefined;

  public subCliente : Subscription ;
  public listaMunicipios$!:Observable<IMunicipio[]>;



  //--- variables de tipo switch para ocultar/mostrar partes de la vista datosenvio--
  public checkdirppalenvio: boolean = false;
  public checkclienteloggedenvio: boolean = true;
  public disabledMuni : boolean = true;
  constructor(
    @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc: IStorageService,
    private restSvc:RestnodeService
  ) {
    this.subCliente = this.storageSvc.RecuperarDatosCliente()
                                      .subscribe(datos => {
                                          this.datosCliente = datos
                                          this.direccioprincipal = this.datosCliente?.direcciones?.filter((dir :IDireccion) => dir.esPrincipal == true)[0];
                                        });


  }
  ngOnInit(): void {
    if(this.datosCliente != null){
      this.formDatosEnvio.patchValue({
        nombreDestinatario: this.datosCliente?.nombre,
        apellidosDestinatario: this.datosCliente.apellidos,
        telefonoDestinatario : this.datosCliente?.telefono,
        emailDestinatario: this.datosCliente?.cuenta.email
      })
    }
  }


  CargarMunicipios(provSelec:string){// <-- va codPro-nombreProv
    this.listaMunicipios$ = this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);
    this.disabledMuni = false;


  }

  CheckdirPpalEnvio(check: boolean) {
    this.checkdirppalenvio = check;
    if(check){
      this.formDatosEnvio.patchValue({
        calle: this.direccioprincipal?.calle,
        cp: this.direccioprincipal?.cp,
        pais: this.direccioprincipal?.pais,
        provincia : this.direccioprincipal?.provincia,
        municipio: this.direccioprincipal?.municipio

      })
    }
  }
  CheckClienteLoggedEnvio(check:boolean){
    this.checkclienteloggedenvio = check;
    if(check){
      this.formDatosEnvio.patchValue({
        nombreDestinatario: this.datosCliente?.nombre+" "+this.datosCliente?.apellidos,
        telefonoDestinatario : this.datosCliente?.telefono,
        emailDestinatario: this.datosCliente?.cuenta.email
      })
    }
  }

  ShowComponenteDatosFactura(ev:any){
    this.checkdatosFacturacionEvent.emit(ev.target.checked);
    this.formDatosPedido.addControl('datosFacturacion', new FormGroup({
      tipoFactura: new FormControl('', [Validators.required]),
      nombreFactura: new FormControl('', [Validators.required]),
      docfiscalFactura: new FormControl('', [Validators.required]),
      paisFactura: new FormControl('', [Validators.required]),
      calleFactura: new FormControl('', [Validators.required]),
      provinciaFactura: new FormControl('', [Validators.required]),
      municipioFactura: new FormControl('', [Validators.required]),
      cpFactura: new FormControl('', [Validators.required]),
    }))

    if(!ev.target.checked){
      this.formDatosPedido.removeControl('datosFacturacion');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.formDatosEnvio = this.formDatosPedido.get('datosEnvio') as FormGroup;
  }

  ngOnDestroy(): void {
   this.subCliente.unsubscribe();
  }
}
