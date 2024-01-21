import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { RestnodeService } from '../servicios/restnode.service';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, Subscription, last, map, tap } from 'rxjs';
import { IRestMessage } from '../modelos/restMessage';

@Directive({
  selector: '[appComprobacionexisteemail]',
  providers:[
    {provide: NG_ASYNC_VALIDATORS, useExisting:ComprobacionexisteemailDirective, multi:true}
  ]
})
export class ComprobacionexisteemailDirective implements AsyncValidator {

  constructor(private restSvc: RestnodeService,
              private inputEmail:ElementRef,
              private render2: Renderer2){

   }
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    //fondo del input email en rojo hasta validacion ok
    if(control.value){
       this.render2.setAttribute(this.inputEmail.nativeElement,'style','background-color: #cfe2ff');

      }

    return this.restSvc.ComprobarEmail(control.value).pipe(
      //operador-1 transformacion observable
      tap( (dato:IRestMessage) => console.log('el servidor me ha devuelto esto...', dato) ),//<-- coge un elem. del observable, lo procesa y lo devuelve tal cual
      map( (dato:IRestMessage)=>{
        if(dato.codigo === 0)
          this.render2.setAttribute(this.inputEmail.nativeElement,'style','background-color: white');
          return dato.codigo === 0 ? null : {'emailexiste': true}
      } ),
      last(), //<--- last, first o take, cogen el ultimo, el primero o un valor(concreto en caso de take) y cierra automaticamente la subcripcion
      );


  }


}
