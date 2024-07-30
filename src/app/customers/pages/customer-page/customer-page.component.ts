import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { phoneNumberValidator } from '../../phone-number.directive';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../interfaces/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pages-register-form',
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    customerId: [''],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    cuit: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), /*Validator.pattern*/]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), phoneNumberValidator(/[0-9]{3}-[0-9]{1}-[0-9]{6}/)]],
    address: ['', [Validators.required, Validators.minLength(5)]]
  });

  private customer!: Customer;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.customerService.getCustomerById(id))
      )
      .subscribe(customer => {
        if (!customer) return this.router.navigate(['/']);
        return this.form.reset(customer);
      })
  }

  get currentCustomer(): Customer {
    this.customer = this.form.value as Customer;
    return this.customer;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.currentCustomer.customerId) {
      this.customerService.updateCustomer(this.currentCustomer, this.currentCustomer.customerId)
        .subscribe(customer => {
          this.showSnackbar(`${customer.email} updated!`)
        });
        return;
    }

    this.customerService.registerCustomer(this.currentCustomer)
      .subscribe( customer => {
        this.showSnackbar(`${customer.email} created!`);
        setTimeout(() => {
          this.router.navigate(['/auth/edit', customer.customerId]);
        }, 3000);
      });
  }

  onDelete(): void {
    if (!this.currentCustomer.customerId) throw Error('Customer id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.form.value
    })

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => this.customerService.deleteCustomerById(this.currentCustomer.customerId)),
        filter(wasDeleted => wasDeleted)
      )
      .subscribe(() => {
        this.showSnackbar(`Account deleted!`);
        this.router.navigate(['/']);
      })
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }
}
