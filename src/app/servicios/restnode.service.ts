import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
  constructor(private petAjax:HttpClient) { }

}
