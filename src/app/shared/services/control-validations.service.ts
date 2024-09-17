import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ControlValidationsService {

  constructor() { }

  isValidField(field: string, form: FormGroup): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  getFieldError(field: string, form: FormGroup): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const err of Object.keys(errors)) {
      switch(err) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
        case 'maxlength':
          return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
        case 'email':
          return 'Email no válido';
        case 'pattern':
          return 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula,\n'+
           'un número y un caracter especial';
        case 'min':
          return `Mínimo ${errors['min'].min} como valor`;
        case 'max':
          return `Máximo ${errors['max'].max} como valor`;
      }
    }

    return null;
  }
}
