// validador sincrono para comparar el valor de dos campos, si coincide no devuelvo error, sino coincide devuelvo error
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function compareToValidator(idControlAComparar: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    //tengo que recuperar el valor del campo del formulario (FormControl) con nombre: nombreControlAComparar

    const valorControl: string = control.value;
    const valorAComparar: string = control.parent?.get(idControlAComparar)?.value;

    if (valorControl === valorAComparar) {
      //si validacion esta ok...
      return null;
    } else {
      //validacion erronea, no coinciden valores....
      return { 'compareTo': true };
    }
  };
}
