import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../phone-number.directive';

@Component({
  selector: 'customers-register-form',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  public registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    cuit: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), /*Validator.pattern*/]],
    phone: ['', [
      Validators.required,
      Validators.minLength(10),
      phoneNumberValidator(/[0-9]{3}-[0-9]{1}-[0-9]{6}/)
    ]],
    address: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private fb: FormBuilder) {

  }

  isValidField(field: string): boolean | null {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null {
    if (!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field].errors || {};

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
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid)
      console.log(this.registerForm.value);
    console.log('invalid');
  }
}
