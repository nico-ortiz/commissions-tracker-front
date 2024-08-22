import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { phoneNumberValidator } from '../../../../customers/phone-number.directive';
import { Receiver } from '../../interfaces/receiver.interface';
import { ReceiverService } from '../../services/receiver.service';
import { ParcelService } from '../../services/parcel.service';
import { Commission } from '../../interfaces/commission.interface';
import { NewCommission } from '../../interfaces/new-commission.interface';
import { Customer } from '../../../../customers/interfaces/customer';
import { CustomersService } from '../../../../customers/services/customers.service';

@Component({
  selector: 'operation-create-receiver-page',
  templateUrl: './create-receiver-page.component.html',
  styleUrl: './create-receiver-page.component.css'
})
export class CreateReceiverPageComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    receiverId: [''],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), phoneNumberValidator(/[0-9]{3}-[0-9]{1}-[0-9]{6}/)]],
    date: ['', [Validators.required]],
    openingHour: [, [Validators.required]],
    closingHour: [, [Validators.required]],
  });

  public today!: string;
  private receiver!: Receiver;
  private commission!: NewCommission;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomersService,
    private parcelService: ParcelService,
    private receiverService: ReceiverService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const todayDate = new Date();
    const yyyy = todayDate.getFullYear();
    const mm   = todayDate.getMonth();
    const dd   = todayDate.getDay();
    this.today = `${yyyy}-${mm}-${dd}`;

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.receiverService.getReceiverById(id))
      )
      .subscribe(receiver => {
        if (!receiver) return this.router.navigate(['/']);
        return this.form.reset(receiver);
      })
  }

  get getCurrentReceiver(): Receiver {
    this.receiver = this.form.value as Receiver;
    return this.receiver;
  }

  get isValidForm(): boolean {
    return this.form.valid;
  }

  get isPristineForm(): boolean {
    return this.form.pristine;
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    if (this.getCurrentReceiver.receiverId) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: null
      });

      dialogRef.afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.receiverService.updateReceiver(this.getCurrentReceiver.receiverId, this.getCurrentReceiver)),
          filter(wasUpdated => wasUpdated)
        )
        .subscribe(() => {
          this.showSnackbar(`Destinatario actualizado!`);
        })
        return;
    }

    this.receiverService.createReceiver(this.getCurrentReceiver)
      .subscribe(receiver => {
        this.receiver = receiver;
        this.createParcel();
        this.showSnackbar(`Destinatario añadido correctamente!`);
        setTimeout(() => {
          this.router.navigate(['/parcels/make-parcel/edit-receiver', receiver.receiverId]);
        }, 3000)
      })
  }

  createParcel(): void {
    const commission: NewCommission = {
      description: "a",
      // customerId: this.customerService.getCustomer.customerId,
      customerId: '1',
      // receiverId: this.receiver.receiverId
      receiverId: '1',
    };

    this.parcelService.createCommission(commission)
      .subscribe();
  }


  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }
}
