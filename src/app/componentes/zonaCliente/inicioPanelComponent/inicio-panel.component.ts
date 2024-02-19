import { Component, ElementRef, Inject, InputSignal, OnDestroy, Renderer2, Signal, ViewChild, ɵINPUT_SIGNAL_BRAND_WRITE_TYPE } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, first, map } from 'rxjs';
import { ICliente } from '../../../modelos/cliente';
import { IDireccion } from '../../../modelos/direccion';
import { RestnodeService } from '../../../servicios/restnode.service';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ModalDireccionesComponent } from '../modalDireccionesComponent/modal-direcciones.component';
import { compareToValidator } from '../../../validators/compareTo';
import { IRestMessage } from '../../../modelos/restMessage';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-inicio-panel',
  templateUrl: './inicio-panel.component.html',
  styleUrl: './inicio-panel.component.css'
})
export class InicioPanelComponent implements OnDestroy {
  public formdatos: FormGroup;
  public dias: Array<number> = Array.from({length:31}, (el,pos)=> pos + 1);
  public meses: Array<string> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public anios: Array<number> = Array.from({ length: new Date(Date.now()).getFullYear() - 1933 }, (el, pos) => pos + 1934);


  public imgSrc: string="";
  public _fichImagen!:File;

  public datosClienteStorage$:Observable<ICliente|null>;
  public direcciones$!:Observable<IDireccion[]>;
  private emailCliente:string="";
  public mensajeServer :string='';

  public diccDirec :Map<IDireccion,string> = new Map();
  public diccDatosCliente :Map<any,string> = new Map()
  private subUpdateCliente? :Subscription;
  private clienteCopy: ICliente =  {} as ICliente;
  private clienteInicial : ICliente =  {} as ICliente;

  public direcEditar: IDireccion= {
    idDireccion:window.crypto.randomUUID(),
    calle:'',
    cp:'',
    pais:'',
    provincia:{CCOM:'',CPRO:'',PRO:''},
    municipio:{CMUM:'',CPRO:'',CUN:'',DMUN50:''},
    esPrincipal:false,
    esFacturacion:false,
  }

  @ViewChild('btnUploadImagen') btnUploadImagen!: ElementRef;
  @ViewChild('modaldirec') modaldirec!: ModalDireccionesComponent;
  @ViewChild('btonNewDireccion') btonNewDireccion!:ElementRef;


  /**
   *
   */
  constructor(private renderer2: Renderer2, private restSvc:RestnodeService,
              @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc:IStorageService) {

                this.datosClienteStorage$=this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>;
                /*this.direcciones$ = this.datosClienteStorage$.pipe(
                  map(
                    (cliente:ICliente|null)=> {
                      if(cliente && cliente.direcciones && cliente.direcciones.length > 0){
                        return cliente.direcciones;
                      }else{
                        return[];
                      }

                    }
                  )
                )as Observable<IDireccion[]>;*/

                this.RecuperarDireccionesClienteObserver();




                this.formdatos = new FormGroup(
                  {
                  email: new FormControl({ value:'', disabled: true }, [Validators.required, Validators.email]),
                  nombre: new FormControl( '', [Validators.required, Validators.maxLength(150)]),
                  apellidos: new FormControl( '', [Validators.required, Validators.maxLength(250)]),
                  telefono: new FormControl( '', [Validators.required, Validators.pattern('^[0-9]{3}\\s?([0-9]{2}\\s?){3}$')]),
                  password: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$')]),
                  repassword: new FormControl('',[compareToValidator('password')]), // crear validador personalizado sincrono para comprobar si coincide con password
                  genero: new FormControl(  ''),
                  login: new FormControl(  '', [Validators.required]),
                  dia: new FormControl( '0'),
                  mes: new FormControl( '0 '),
                  anio: new FormControl('0'),
                  descripcion: new FormControl('', [Validators.maxLength(500)])
                  }
                ); //cierre formgroup formulario datos personales....

                   //inicializamos el formulario con el ultimo valor del observable de datos del cliente...
                this.datosClienteStorage$.subscribe(
                  (datoscliente:ICliente|null)=>{
                    this.imgSrc=datoscliente?.cuenta.imagenAvatarBASE64 || '';
                    this.emailCliente = datoscliente?.cuenta.email || '';
                    this.clienteCopy = datoscliente as ICliente;

                    this.clienteInicial = JSON.parse(JSON.stringify(datoscliente as ICliente));

                    this.formdatos.controls['email'].setValue(datoscliente?.cuenta.email);
                    this.formdatos.controls['nombre'].setValue(datoscliente?.nombre);
                    this.formdatos.controls['apellidos'].setValue(datoscliente?.apellidos);
                    this.formdatos.controls['telefono'].setValue(datoscliente?.telefono);
                    this.formdatos.controls['genero'].setValue(datoscliente?.genero);
                    this.formdatos.controls['login'].setValue(datoscliente?.cuenta.login);
                    this.formdatos.controls['descripcion'].setValue(datoscliente?.descripcion);

                    if(datoscliente?.fechaNacimiento){
                      this.formdatos.controls['dia'].setValue(new Date(datoscliente.fechaNacimiento).getDay());
                      this.formdatos.controls['mes'].setValue(new Date(datoscliente.fechaNacimiento).getMonth());
                      this.formdatos.controls['anio'].setValue(new Date(datoscliente.fechaNacimiento).getFullYear());
                    }
                  }
                ); //fin sub observable cliente
  }
  ngOnDestroy(): void {
    console.log(this.clienteInicial)
    this.storageSvc.AlmacenarDatosCliente(this.clienteInicial)
    this.subUpdateCliente?.unsubscribe();
  }


  public async UpdateDatosCliente(){
    console.log(this.formdatos)
    console.log('copyCliente..',this.clienteCopy);
    let passCambiar ='';
    if(this.imgSrc){
      this.diccDatosCliente.set(this.imgSrc,`updateImagen_${this.emailCliente}`);
      console.log(this.diccDatosCliente)
      this.clienteCopy.cuenta.imagenAvatarBASE64=this.imgSrc;
    }
    if(this.formdatos.valid){
      this.diccDatosCliente.set(this.formdatos.value, `updateCliente_${this.emailCliente}`)
      this.clienteCopy.cuenta.email = this.formdatos.get('email')?.value;
      this.clienteCopy.telefono = this.formdatos.get('telefono')?.value;
      this.clienteCopy.cuenta.login = this.formdatos.get('login')?.value;
      this.clienteCopy.nombre = this.formdatos.get('nombre')?.value;
      this.clienteCopy.apellidos = this.formdatos.get('apellidos')?.value;
      this.clienteCopy.genero = this.formdatos.get('genero')?.value;
      this.clienteCopy.descripcion = this.formdatos.get('descripcion')?.value;
      let fecha =new Date(this.formdatos.get('anio')?.value, this.formdatos.get('mes')?.value, this.formdatos.get('dia')?.value)
      this.clienteCopy.fechaNacimiento = new Date(fecha);

       passCambiar = this.formdatos.get('password')?.value as string;
    }
    console.log('diccionarios...', (this.diccDatosCliente,this.diccDirec))

          let _resp = await this.restSvc.UpdateDatosCliente(this.clienteCopy,passCambiar,this.emailCliente)
          if(_resp.codigo === 0){
            console.log('todo perfe jefe');

            this.storageSvc.AlmacenarDatosCliente(_resp.datoscliente as ICliente);
            this.storageSvc.AlmacenarJWT(_resp.token as string);

            //this.datosClienteStorage$ = this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>;

            this.mensajeServer = _resp.mensaje;
          }else{
            console.log('fatal va esto')
            this.mensajeServer = _resp.mensaje;
          }
  }

  public PrevisualizarImagen(inputimagen:any){
    this._fichImagen=inputimagen.files[0] as File;
    let _lector : FileReader = new FileReader();

    _lector.addEventListener('load', ev =>  {
        console.log(ev.target?.result)
        this.imgSrc = ev.target?.result as string;
        this.renderer2.removeAttribute(this.btnUploadImagen.nativeElement, 'disabled');
    });

    _lector.readAsDataURL(this._fichImagen);

    console.log(this.diccDatosCliente)
      }

  public UploadImagen(){
    this.renderer2.removeAttribute(this.btnUploadImagen.nativeElement, 'disabled');

  }

  public OperarDirecciones(datos:[IDireccion,string]){
    switch(datos[1]){
      case "pendientemodificar":
        //muestro modal con direccion a modificar...
      console.log('vamos a modificar direccion...', datos[0])

      this.modaldirec.operacion='modificar';
      this.modaldirec.direccionEd().calle =datos[0].calle ;
      this.modaldirec.direccionEd().esPrincipal =datos[0].esPrincipal ;
      this.modaldirec.direccionEd().idDireccion =datos[0].idDireccion ;
      this.modaldirec.direccionEd().municipio =datos[0].municipio ;
      this.modaldirec.direccionEd().pais =datos[0].pais ;
      this.modaldirec.direccionEd().provincia =datos[0].provincia ;
      this.modaldirec.direccionEd().esFacturacion =datos[0].esFacturacion ;
      this.modaldirec.direccionEd().cp=datos[0].cp ;

      

      //console.log(this.modaldirec.direccionEd())
      this.modaldirec.PrecargaDatosFormConDireccionModif();

      //this.modaldirec.ShowModal();
      this.modaldirec.iniciarModal = true;
      this.btonNewDireccion.nativeElement.click();
      break;

      case "eliminar":
      this.diccDirec.set(datos[0],datos[1].concat('_Dir'))
        let dirs = this.clienteCopy.direcciones?.filter(d => d.idDireccion !== datos[0].idDireccion)
        this.clienteCopy.direcciones = dirs;

       this.RecuperarDireccionesClienteObserver()

      console.log(this.clienteCopy.direcciones)

      break;


      default:break;
    }
  }

  public RecuperarDireccionesModal(datos:Map<IDireccion,string>){
    this.diccDirec = datos;
    datos.forEach((v,k) => {
      console.log('valores...',v,k)
      let operacion = v.split('_')[0];
    switch (operacion) {
      case 'crear':
      this.clienteCopy.direcciones?.push(k);
      this.RecuperarDireccionesClienteObserver()

        break;

      case 'modificar':
      let posDir = this.clienteCopy.direcciones?.findIndex(d => d.idDireccion === k.idDireccion) ?? -1;
      if(posDir != -1){
        this.clienteCopy.direcciones![posDir] = k ;

      }
      break;

      default:
        break;
    }
    })
    console.log('dirs clientecopy...',this.clienteCopy.direcciones)
    console.log(this.diccDirec)
  }


  RecuperarDireccionesClienteObserver(){
    this.direcciones$ = this.datosClienteStorage$.pipe(
      map(
        (cliente:ICliente|null)=> {
          if(cliente && cliente.direcciones && cliente.direcciones.length > 0){
            return cliente.direcciones;
          }else{
            return[];
          }

        }
      )
    )as Observable<IDireccion[]>;

  }


}

