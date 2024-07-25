import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { phoneNumberValidator } from '../../phone-number.directive';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../interfaces/customer';
import { Router } from '@angular/router';

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
    phoneNumber: ['', [
      Validators.required,
      Validators.minLength(9),
      phoneNumberValidator(/[0-9]{3}-[0-9]{1}-[0-9]{6}/)
    ]],
    address: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  get currentCustomer(): Customer {
    const customer = this.registerForm.value as Customer;
    return customer;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.customerService.registerCustomer(this.currentCustomer)
      .subscribe( customer => {
        this.showSnackbar(`${customer.email} created!`);
        setTimeout(() => {
          this.router.navigateByUrl('/parcels/home');
        }, 3000);
      });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }
}
