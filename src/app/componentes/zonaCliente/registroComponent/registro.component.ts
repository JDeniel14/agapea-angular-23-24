import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { compareToValidator } from '../../../validators/compareTo';
import { RestnodeService } from '../../../servicios/restnode.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IRestMessage } from '../../../modelos/restMessage';
@Component({
  selector: 'app-registro',
  /*template:/* `` codigo html */
  /*styles: codigo css*/
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnDestroy {
  public miForm: FormGroup;
  public observableRegistro: Observable<IRestMessage>;
  public subcriptionRegistro: Subscription;
  constructor(private restService: RestnodeService, private router: Router) {
    this.observableRegistro = new Observable<IRestMessage>();
    this.subcriptionRegistro = new Subscription();
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]), //<---- validador asincrono para comprobar q no exista ya el email
      repemail: new FormControl('', [
        Validators.required,
        Validators.email,
        compareToValidator('email'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'
        ),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'
        ),
        compareToValidator('password'),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      telefono: new FormControl(''),
    });
  }

  registrarCliente() {
    console.log(this.miForm);
    //recibir datos como observable... al subscribirse almacenamos los datos en una variable
    //cuando te subscribas, recibes objeto IRestMessage (controlar codigo respuesta)
    //en el dispose del componente usando esa variable, cierre subscripcion...

    this.observableRegistro = this.restService.Registro(this.miForm.value);
    this.subcriptionRegistro = this.observableRegistro.subscribe((datos) => {
      console.log('datos recibidos del server...', datos);
    });
  }

  ngOnDestroy(): void {
    if (this.subcriptionRegistro) {
      this.subcriptionRegistro.unsubscribe();
    }
  }
}
