import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDireccion } from '../../../modelos/direccion';

@Component({
  selector: 'app-mini-direccion',
  templateUrl: './mini-direccion.component.html',
  styleUrl: './mini-direccion.component.css'
})
export class MiniDireccionComponent {
  @Input() direccion!:IDireccion;
  @Output() operarDirecEvent:EventEmitter<[IDireccion,string]>= new EventEmitter<[IDireccion,string]>();
  
}
