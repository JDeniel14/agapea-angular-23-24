import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/**
 * Cuando quieres aplicar una directiva de validacion en un template hay que inyectarlo con un validador añadiendo el decorador
 * y la prop. providers:
 *
 *
 */
@Directive({//<---- decorador que da informacion para que interprete que es una directiva
  selector: '[appEmailfilterdomain]',
  providers: [
    //para que la directiva actue como un validador SINCRONO en un atributo del elemento dom en un tamplate form, tengo que definirla como
    //inyectable en servicios de validacion
    {
      //provide: NG_ASYNC_VALIDATORS <--- SI QUIERO QUE LA DIRECTIVA ACTUE COMO DIRECTIVA DE VALIDACION ASINCRONA
      provide: NG_VALIDATORS, useExisting:EmailfilterdomainDirective, multi:true
       //le indico la clave que va a ser validador sincrono y que va a usar un elemento existente que es la misma
    },

  ]
})

//si quiero que valide, tengo que implementar Validator
export class EmailfilterdomainDirective implements Validator {
/**
 * Cuando quiero pasar x valor, por ejemplo los dominios de email validos, como propiedad, le ponemos el decorador @input
 *
 */
@Input() dominiosvalidos:string[]=[];
//en una directiva puedes inyectar en el constructor una referencia al elemento del DOM sobre el que se aplica en un template-orm, el tipo de dato es: ElementRef
//inyecto instancia servicio Render2 <--- esto otorga props/metodos para modificar elementos del DOM desde codigo
constructor( private inputEmail:ElementRef,
            private render2: Renderer2) {
  }


  validate(control: AbstractControl<any, any>): ValidationErrors | null {
 //metodo que se va a ejecutar cada vez que el contenido del elemento del dom cambia (en este caso el input=email)
 //si el metodo devuelve null <--- validacion correcta
 //si devuelve objeto ValidationErrors {'clave-errror': valor} <--- validacion invalida, este objeto apareceria en .errrors del form-control


//por defecto ponemos color de fondo rojo:
if(control.value){
  this.render2.setAttribute(this.inputEmail.nativeElement,'style','background-color: red');
}

 console.log('valor de caja...', control.value);

 if(control.value && (control.value as string).indexOf('@')){ //hay que buscar el @ con indexof, no hay contains, devuelve undefined o la posicion
  let _dombuscar = (control.value as string).split('@')[1].split('.')[0]; //si el control.value="mio@dominio.es" -> dominio.es -> dominio <--- quiero eso


  //return this.dominiosvalidos.some( dom => dom === _dombuscar) ? (null) : { 'emailfilterdom': {'mensaje':'dominio de email inválido', 'validos': this.dominiosvalidos}};

  if(this.dominiosvalidos.some( dom => dom === _dombuscar)){

    this.render2.setAttribute(this.inputEmail.nativeElement,'style','background-color: green');

    return null;
  }else{
    return  { 'emailfilterdom':
                                {
                                  'mensaje':'dominio de email inválido',
                                  'validos': this.dominiosvalidos
                                }
            };
  }
  //si esta correcto devuelve null, sino devuelve el mensaje y los dom. validos

 }else{
  return null;
 }


  }


}
