import { Component, Input } from '@angular/core';
import { ControlConfig, FormBuilder, FormGroup } from '@angular/forms';
import { ControlValidationsService } from '../../../customers/services/control-validations.service';

@Component({
  selector: 'shared-error-field',
  templateUrl: './error-field.component.html',
  styleUrl: './error-field.component.css'
})
export class ErrorFieldComponent {

  @Input()
  public field!: string;

  @Input()
  public form!: FormGroup;

  constructor(
    private controlValidationService: ControlValidationsService
  ) {}

  public isValidField(field: string): boolean | null {
    return this.controlValidationService.isValidField(field, this.form);
  }

  public fieldsErrors(field: string): string | null {
    return this.controlValidationService.getFieldError(field, this.form);
  }
}
