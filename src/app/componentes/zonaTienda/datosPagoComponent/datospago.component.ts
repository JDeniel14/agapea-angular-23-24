import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IDatosPago } from '../../../modelos/datospago';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datospago',
  templateUrl: './datospago.component.html',
  styleUrl: './datospago.component.css'
})
export class DatospagoComponent implements OnChanges, OnInit{
 @Input() tituloPago!:string | undefined;
 @Input() datosPagoPedido:IDatosPago = {}as IDatosPago;
 @Input() formDatosPedido!:FormGroup;
 public formDatosPago!:FormGroup;
 public anios : number[] = [];
 public meses : number[] = [];

 public checkPagoTarjeta : boolean = true;

 constructor() {

  for(let anio = new Date().getFullYear(); anio <= new Date().getFullYear()+10; anio++){
    this.anios.push(anio)
  }
  for (let mes = 1; mes <= 12; mes++) {
    this.meses.push(mes);
  }
 }
  ngOnInit(): void {
    if(this.checkPagoTarjeta){
      this.formDatosPago.patchValue({
        metodoPago:'Tarjeta'
      })
    }
  }

 ChangeCheckPagoTarjeta(check: boolean){
  this.checkPagoTarjeta = check;
  if(check){
    this.formDatosPago.patchValue({
      metodoPago:'Tarjeta'
    })

  }else{
    this.formDatosPago.patchValue({
      metodoPago:'Paypal'
    })
  }
  console.log(this.checkPagoTarjeta)
 }

  ngOnChanges(changes: SimpleChanges): void {
    this.formDatosPago = this.formDatosPedido.get('datosPago') as FormGroup;
  }
}
