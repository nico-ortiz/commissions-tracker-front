import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function phoneNumberValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const b = regex.test(control.value);
    return b ? {invalidPassword: {value: control.value}} : null;
  }
}
