import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ControlValidationsService } from '../../../shared/services/control-validations.service';
import { CustomersService } from '../../services/customers.service';
import { Observable, tap } from 'rxjs';
import { Customer } from '../../interfaces/customer';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]]
  });

  public customers: Customer[] = [];

  constructor(
    private fb: FormBuilder,
    private controlValidationService: ControlValidationsService,
    private customerService: CustomersService
  ) {
  }

  public isValidField(field: string): boolean | null {
    return this.controlValidationService.isValidField(field, this.loginForm);
  }

  public fieldsErrors(field: string): string | null {
    return this.controlValidationService.getFieldError(field, this.loginForm);
  }

  public onLogin(): void {

  }
}
