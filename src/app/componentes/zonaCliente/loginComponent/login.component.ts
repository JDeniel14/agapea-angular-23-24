import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public miForm:FormGroup;
  constructor( private router: Router){
    this.miForm = new FormGroup(
      {
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'), Validators.minLength(5)]),

      }
    );
  };

  irARegistro(){
    this.router.navigateByUrl('/Cliente/Registro');
  }

  loginCliente(){
    console.log(this.miForm)
  }
}
