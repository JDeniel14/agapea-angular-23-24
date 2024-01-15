import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../modelos/cliente';
import { Observable, lastValueFrom } from 'rxjs';
import { IRestMessage } from '../modelos/restMessage';


/**
 * indica que se inyecta en root y va a estar disponible para toda la app
 */
@Injectable({
  providedIn: 'root'
})
export class RestnodeService {
  // servicio para poder hacer pet.rest a ser.RESTFULL de nodejs
  /**
   * Si usamos JS y fetch api, puede comportarse de manera extraña, es recomendable usar siempre las clases de Angular
   */
  constructor(private _httpClient:HttpClient) { }

  public LoginCliente(credenciales:{email:string,password:string}):Promise<IRestMessage>{
    //buscar como se hace para mandar objeto "credencialees" que pasa el componente login.component.ts
    //a nodejs usando el servicio HTTPCLIENT en angular



    //devuelve un observable

      return lastValueFrom(
        this._httpClient.post<IRestMessage>('http://localhost:3000/api/Cliente/Login',
                          credenciales,
                          {
                            headers: new HttpHeaders({'Content-Type':'application/json'})
                          }
                          )
      );

  }

  public Registro(cliente:ICliente):Observable<IRestMessage>{
    //buscar como se hace para mandar objeto "cliente" que pasa el componente registro.component.ts
    //a nodejs usando el servicio HTTPCLIENT en angular

    //lo tenemos que recibir como observable

    return this._httpClient.post<IRestMessage>(
                'http://localhost:3000/api/Cliente/Registro',
                cliente,
                {
                  headers: new HttpHeaders({'Content-Type':'application/json'})
                }
    );
  }
}
