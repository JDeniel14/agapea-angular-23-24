import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../modelos/cliente';
import { Observable, lastValueFrom } from 'rxjs';
import { IRestMessage } from '../modelos/restMessage';
import { ILibro } from '../modelos/libro';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ICategoria } from '../modelos/categoria';
import { IProvincia } from '../modelos/provincia';
import { IMunicipio } from '../modelos/municipio';
import { IPedido } from '../modelos/pedido';
import { KeyValue } from '@angular/common';
import { IDireccion } from '../modelos/direccion';


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
//#region  ---- metodos para zona cliente
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

  public ReLoginCliente(datos:{idpedido:string,idcliente:string}):Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.post<IRestMessage>('http://localhost:3000/api/Cliente/ReLogin',
        datos,
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

  public UpdateDatosCliente(datosCliente: ICliente,passCambiar:string, emailCliente:string):Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.post<IRestMessage>(
        'http://localhost:3000/api/Cliente/UpdateDatosCliente',
        {datosCliente,passCambiar,emailCliente},
        {headers: new HttpHeaders({'Content-Type':'application/json'})}
      )

    )
  }
//#endregion

//#region  ---- metodos para zona tienda
  public RecuperarCategorias(idcat:string):Observable<ICategoria[]>{

    if(!! idcat ) idcat='raices';
    return this._httpClient.get<ICategoria[]>(`http://localhost:3000/api/Tienda/RecuperarCategorias?idcat=${idcat}`);

  }

  public  RecuperarLibros(idcat:string): Observable<ILibro[]>{

    if(!! idcat)idcat="2-10";
    return  this._httpClient.get<ILibro[]>(`http://localhost:3000/api/Tienda/RecuperarLibros?idcat=${idcat}`)
  }

  public  RecuperarUnLibro(isbn:string):Observable<ILibro>{

    return this._httpClient.get<ILibro>(`http://localhost:3000/api/Tienda/RecuperarUnLibro?isbn=${isbn}`)
  }

  public RecuperarProvincias():Observable<IProvincia[]>{
    return this._httpClient.post<IProvincia[]>('http://localhost:3000/api/Tienda/RecuperarProvincias',
        {
          headers: new HttpHeaders({'Content-Type' : 'application/json'})
        }
    )
  }

  public RecuperarMunicipios(codpro:string):Observable<IMunicipio[]>{

    return this._httpClient.get<IMunicipio[]>(`http://localhost:3000/api/Tienda/RecuperarMunicipios?codpro=${codpro}`);
  }

  public FinalizarPedido(pedido : IPedido, email: string):Promise<IRestMessage>{
    return lastValueFrom(
      this._httpClient
          .post<IRestMessage>(
            "http://localhost:3000/api/Pedido/FinalizarPedido",
            { pedido, email},
            { headers: new HttpHeaders({'Content-Type':'application/json'}) }
          )
    );
  }
  //#endregion
}
