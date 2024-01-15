import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IRestMessage } from '../../../modelos/restMessage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 public credenciales:{email:string, password:string}={email:'',password:''};
 public erroresLoginServer:string='';
  constructor( private router: Router,
              private restService: RestnodeService){

  };

  irARegistro(){
    this.router.navigateByUrl('/Cliente/Registro');
  }

  async loginCliente(loginForm: NgForm){
  console.log('valor del login a mandar...', loginForm.value);

  const _respuesta:IRestMessage = await this.restService.LoginCliente(loginForm.form.value);
  if(_respuesta.codigo === 0){

    this.router.navigateByUrl('/Tienda/Libros');
  }else{
    //mostrar mensajes de error en vista del componente... creas una variable, la metes en un div..
    this.erroresLoginServer = _respuesta.error!;
  }
  }
}
