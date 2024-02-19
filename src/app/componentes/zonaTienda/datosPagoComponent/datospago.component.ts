import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IDatosPago } from '../../../modelos/datospago';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datospago',
  templateUrl: './datospago.component.html',
  styleUrl: './datospago.component.css'
})
export class DatospagoComponent {
  @Input() tituloPago:string="2. - Datos Pago.";
  @Input()datosPago!:IDatosPago;


   meses:number[]=Array.from({length:12}, (el,pos)=> pos+1);
   //meses:string[]=[ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ];
   anios:number[]=Array.from( { length: new Date(Date.now()).getFullYear() - 2000 }, (el,pos)=> pos + 2001 );

}
