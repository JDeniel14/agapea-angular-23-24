import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IRestMessage } from '../../../modelos/restMessage';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ICliente } from '../../../modelos/cliente';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public credenciales: { email: string; password: string } = {
    email: '',
    password: '',
  };
  public erroresLoginServer: string = '';

  constructor(
    private router: Router,
    private restService: RestnodeService,
    @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc: IStorageService
  ) {
    console.log(this.credenciales)
  }

  irARegistro() {
    this.router.navigateByUrl('/Cliente/Registro');
  }

  async loginCliente(loginForm: NgForm) {
    console.log('valor del login a mandar...', loginForm.value);

    const _respuesta: IRestMessage = await this.restService.LoginCliente(
      loginForm.form.value
    );
    if (_respuesta.codigo === 0) {
      let datosCliente: ICliente = _respuesta.datoscliente as ICliente;
      this.storageSvc.AlmacenarDatosCliente(datosCliente);
      this.storageSvc.AlmacenarJWT(_respuesta.token as string)
      console.log(_respuesta);
      this.router.navigateByUrl('/Tienda/Libros/2-10');
    } else {
      //mostrar mensajes de error en vista del componente... creas una variable, la metes en un div..
      this.erroresLoginServer = _respuesta.error!;
    }
  }
}
