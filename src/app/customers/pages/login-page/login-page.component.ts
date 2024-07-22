import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ControlValidationsService } from '../../../shared/services/control-validations.service';

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

  constructor(
    private fb: FormBuilder,
    private controlValidationService: ControlValidationsService
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
