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

  public ComprobarEmail(valorEmail : string):Observable<IRestMessage>{

  return  this._httpClient.get(
      `http://localhost:3000/api/Cliente/ComprobarEmail?email=${valorEmail}`) as Observable<IRestMessage>;
  }

  public OperarCuentaCliente(mode:string|null, oobCode: string|null, apiKey:string|null):Observable<IRestMessage>{

    return this._httpClient.post<IRestMessage>(
      'http://localhost:3000/api/Cliente/OperarCuentaCliente',
      {mode,oobCode,apiKey},
      {
        headers: new HttpHeaders( { 'Content-Type' : 'application/json'})
      }
    );
  }


  public ActivarCuenta(mode:string|null, oobCode: string|null, apiKey:string|null):Observable<IRestMessage>{

    return this._httpClient.get(
      `http://localhost:3000/api/Cliente/ActivarCuenta?mod${mode}&cod=${oobCode}&key=${apiKey}`,

    ) as Observable<IRestMessage>;
  }

  public RecuperarCategorias(idCategoria?:string):Promise<IRestMessage>{

    if( typeof(idCategoria)==='undefined'){
      idCategoria='padres'
    }
    return lastValueFrom(this._httpClient.get<IRestMessage>(
      `http:localhost:3000/api/Tienda/RecuperarCategorias?id=${idCategoria}`
    )
     );
  }
}
