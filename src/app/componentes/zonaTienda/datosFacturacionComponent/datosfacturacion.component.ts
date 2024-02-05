import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { RestnodeService } from '../../../servicios/restnode.service';
import { Observable } from 'rxjs';
import { IMunicipio } from '../../../modelos/municipio';
import { IProvincia } from '../../../modelos/provincia';
import { IDatosPago } from '../../../modelos/datospago';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datosfacturacion',
  templateUrl: './datosfacturacion.component.html',
  styleUrl: './datosfacturacion.component.css'
})
export class DatosfacturacionComponent implements OnChanges, OnInit {
  @Input() datosPagoPedido:IDatosPago = {}as IDatosPago;
  @Input() listaProvincias$ !: Observable<IProvincia[]>;
  @Input() formDatosPedido !: FormGroup;

  public formDatosFacturacion !: FormGroup;
  public formDatosEnvio !:FormGroup;

  public listaMunicipios$!:Observable<IMunicipio[]>;

  public checkempresa : boolean = true;
  public checkmismadirecfactura:boolean = true;
  public disabledMuni : boolean = true;

  @ViewChild("selectmunis") selectmunis!:ElementRef;

  constructor(private restSvc :RestnodeService, private render2:Renderer2) {

  }
  ngOnInit(): void {
    this.render2.setAttribute(this.selectmunis.nativeElement, 'disabled', "true");
  }


  CheckEmpresaChange(check:boolean){
    console.log('checkempresa...',this.checkempresa)
    this.checkempresa = check;
    if(check){
      this.formDatosFacturacion.patchValue({
        tipoFactura :"Empresa"
      })
    }else{
      this.formDatosFacturacion.patchValue({
        tipoFactura :"Particular"
      })
    }
  }



  CargarMunicipios(provSelec:string){// <-- va codPro-nombreProv
    this.listaMunicipios$=this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formDatosEnvio = this.formDatosPedido.get('datosEnvio') as FormGroup;
    this.formDatosFacturacion = this.formDatosPedido.get('datosFacturacion') as FormGroup;
    if(this.checkmismadirecfactura){
      this.formDatosFacturacion.patchValue({
        paisFactura : this.formDatosEnvio.get('pais')?.value,
        calleFactura : this.formDatosEnvio.get('calle')?.value,
        provinciaFactura : this.formDatosEnvio.get('provincia')?.value,
        municipioFactura : this.formDatosEnvio.get('municipio')?.value,
        cpFactura: this.formDatosEnvio.get('cp')?.value,
      });
    }
  }
}
