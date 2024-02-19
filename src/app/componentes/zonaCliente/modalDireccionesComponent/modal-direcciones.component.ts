import { Component, ElementRef, EventEmitter, Input, InputSignal, OnChanges, Output, Renderer2, SimpleChanges, ViewChild, computed, effect, input, ɵINPUT_SIGNAL_BRAND_WRITE_TYPE } from '@angular/core';
import { IDireccion } from '../../../modelos/direccion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProvincia } from '../../../modelos/provincia';
import { IMunicipio } from '../../../modelos/municipio';
import { RestnodeService } from '../../../servicios/restnode.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-modal-direcciones',
  templateUrl: './modal-direcciones.component.html',
  styleUrl: './modal-direcciones.component.css'
})
export class ModalDireccionesComponent implements OnChanges {
  //#region --------- parametro @Input de toda la vida,con setter para interceptar cambios en vez de metodo onchanges----
 /* @Input() set direccionEd(value: IDireccion| undefined){
      console.log('....estamos en el set del param. input...cambiando su valor....')
      if(value!.calle == '' && value!.cp ==''){
        this.operacion='crear'
        //reseteo formulario
        this.formdirecciones.reset()
      }else{
        this.operacion='modificar';
        //precargamos las cajas del form con valores de la direccion pasada como param.
        this.PrecargaDatosFormConDireccionModif()
      }
  };
      get direccionEd():IDireccion|undefined{
        return this.direccionEd;
      }*/
//#endregion

  //#region ------ con SIGNAL-INPUT: input() y effect() ----
    public direccionEd = input.required<IDireccion>();

  //#endregion

  @Output() operarDireccionModalEvent:EventEmitter<Map<IDireccion,string>> = new EventEmitter<Map<IDireccion,string>>();
  public diccDirModal :Map<IDireccion,string> = new Map();

  public formdirecciones: FormGroup;
  public operacion:string='crear';
  public listaprovincias$!:Observable<Array<IProvincia>>;
  public listamunicipios$!:Observable<Array<IMunicipio>>;
  public iniciarModal : boolean= false;
  @ViewChild('btonCerrar') btonCerrar!:ElementRef;
  @ViewChild('selectmunis') selectmunis!:ElementRef;

  /**
   *
   */
  constructor(private restSvc:RestnodeService, private renderer2: Renderer2) {
    this.listaprovincias$ = restSvc.RecuperarProvincias();

    this.formdirecciones= new FormGroup(
      {
        calle:new FormControl('',[Validators.required]),
      cp: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{5}$')]),
      pais: new FormControl( 'España'),
      provincia: new FormControl(),
      municipio: new FormControl()
      }
    );

    console.log(this.iniciarModal)
    effect(
      ()=>{
        console.log(this.operacion)
        if(this.direccionEd()!.calle == '' && this.direccionEd()!.cp ==''){
          this.operacion='crear'
          //reseteo formulario
          this.formdirecciones.reset()
        }else{
          this.operacion='modificar';
          //precargamos las cajas del form con valores de la direccion pasada como param.
          console.log(this.operacion)
          console.log('precargadatos')
          this.PrecargaDatosFormConDireccionModif()
        }
      }
    )
  }


  ngOnChanges(){
    //cada vez que cambia el valor de param. Input, se ejecuta este metodo...

  }

  public CargarMunicipios(provSelec: string){
    this.listamunicipios$ = this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);
    this.renderer2.removeAttribute(this.selectmunis.nativeElement,'disabled');


  }

  public ResetValoresModal(){
    this.direccionEd[ɵINPUT_SIGNAL_BRAND_WRITE_TYPE] = {} as IDireccion;
    this.operacion='crear';

  }
  public  PrecargaDatosFormConDireccionModif(){
    console.log('hola precarga')
    console.log(this.direccionEd())
    this.formdirecciones.controls['calle'].setValue(this.direccionEd()!.calle)//setValue(this.direccionEd()!.calle) <-- con signal
    this.formdirecciones.controls['cp'].setValue(this.direccionEd().cp)
    this.formdirecciones.controls['pais'].setValue(this.direccionEd!().pais)
    this.formdirecciones.controls['provincia'].setValue(this.direccionEd!().provincia.CPRO+'-'+this.direccionEd()?.provincia.PRO)

    this.CargarMunicipios(this.direccionEd()!.provincia.CPRO);
    //dejo un poco de tiempo para q se carguen los municipios...
    setTimeout(
      () => this.formdirecciones.controls['municipio'].setValue(this.direccionEd()!.municipio.CMUM+'-'+this.direccionEd()?.municipio.DMUN50),
      1000);

  }

  public OperarDireccion(){

    //tras alta o modificacion, ocultamos modal..
    let muni = this.formdirecciones.get('municipio')?.value as string;
      let prov  = this.formdirecciones.get('provincia')?.value as string;
    switch (this.operacion) {

      case 'crear':
        console.log(this.formdirecciones.get('cp')?.value)
        this.direccionEd().calle= this.formdirecciones.get('calle')?.value;
        this.direccionEd().pais= this.formdirecciones.get('pais')?.value;
        this.direccionEd().cp= this.formdirecciones.get('cp')?.value;

        this.direccionEd().municipio.DMUN50=muni.split('-')[1];
        this.direccionEd().municipio.CMUM= muni.split('-')[0];;
        this.direccionEd().provincia.CPRO=  prov.split('-')[0];
        this.direccionEd().provincia.PRO= prov.split('-')[1];
        this.direccionEd().idDireccion = window.crypto.randomUUID();
        this.diccDirModal.set(this.direccionEd(),this.operacion.concat('_Dir'));

        break;

      case 'modificar':
        this.direccionEd().calle= this.formdirecciones.get('calle')?.value;
        this.direccionEd().pais= this.formdirecciones.get('pais')?.value;
        this.direccionEd().cp= this.formdirecciones.get('cp')?.value;

        this.direccionEd().municipio.DMUN50=muni.split('-')[1];
        this.direccionEd().municipio.CMUM= muni.split('-')[0];;
        this.direccionEd().provincia.CPRO=  prov.split('-')[0];
        this.direccionEd().provincia.PRO= prov.split('-')[1];
        this.diccDirModal.set(this.direccionEd(),this.operacion.concat('_Dir'))
      break;

      default:
        break;
    }

    console.log(this.diccDirModal)
    this.operarDireccionModalEvent.emit(this.diccDirModal)
    this.HideModal();
  }

  public HideModal(){
    this.formdirecciones.reset();
    this.btonCerrar.nativeElement.click();
  }
}
