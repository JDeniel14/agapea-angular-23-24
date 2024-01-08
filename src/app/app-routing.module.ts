import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/zonaCliente/registroComponent/registro.component';
import { LoginComponent } from './componentes/zonaCliente/loginComponent/login.component';


// modulo principal de entutamiento usado por el modulo global de la aplicacion app.module.ts
//necesitan tener definidos un array de objetos de tipo interface Route
/**
 * Los Route son interfaces.
 * En angular el modelado de datos se hace con interfaces
 */
const routes: Routes = [
  {
    path: 'Cliente',
    children: [
      { path: 'Registro', component: RegistroComponent },
      { path: 'Login', component: LoginComponent },
    ],
  },
  { path: '', redirectTo: 'Cliente/Login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }