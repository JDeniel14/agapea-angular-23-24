import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { compareToValidator } from '../../../validators/compareTo';
@Component({
  selector: 'app-registro',
  /*template:/* `` codigo html */
  /*styles: codigo css*/
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  public miForm:FormGroup;

    constructor() {
      this.miForm = new FormGroup(
        {
          nombre: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]  ),
          apellidos: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(200) ]),
          email: new FormControl('', [ Validators.required, Validators.email ] ), //<---- validador asincrono para comprobar q no exista ya el email
          repemail: new FormControl('', [ Validators.required, Validators.email, compareToValidator('email') ]),
          password: new FormControl('',[ Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$')] ),
          repassword: new FormControl('',[ Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'), compareToValidator('password') ]),
          login: new FormControl('',[ Validators.required,Validators.minLength(3),Validators.maxLength(25) ]),
          telefono: new FormControl(''),
        }
      );

    }

    registrarCliente(){
      console.log(this.miForm)
      
    }
}
