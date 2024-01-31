import { InjectionToken } from "@angular/core";
import { IStorageService } from "../modelos/interfaceservicios";

export const MI_TOKEN_SERVICIOSTORAGE = new InjectionToken<IStorageService>('ClaveStorageServices');//1arg -> como se va a llamar para usarlo y pedirlo al modulo de dependencias
//el string del constructor de InjectionToken es la clave con la que se van a identificar en el modulo de DI todos los servicios
//que implementen la interface IStorageService

//cuando un componente solicite al DI la inyeccion de un servicio que implemente la interface necesita esa constante
