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
import { PackageService } from '../../services/package.service';
import { NewCommission } from '../../interfaces/new-commission.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { BackButtonService } from '../../../../shared/services/back-button.service';

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
    address: ['', [Validators.required, Validators.minLength(5)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), phoneNumberValidator(/[0-9]{3}-[0-9]{1}-[0-9]{6}/)]],
    date: ['', [Validators.required]],
    openingHour: [, [Validators.required]],
    closingHour: [, [Validators.required]],
  });

  public today!: string;
  private receiver!: Receiver;
  private commission!: NewCommission;
  public  activeButton!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private parcelService: PackageService,
    private receiverService: ReceiverService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private localStorage: LocalStorageService,
    private backButtonEnable: BackButtonService
  ) {}

  ngOnInit(): void {
    const todayDate = new Date();
    const yyyy = todayDate.getFullYear();
    const mm   = todayDate.getMonth();
    const dd   = todayDate.getDay();
    this.today = `${yyyy}-${mm}-${dd}`;

    this.activeButton = this.backButtonEnable.getEnableButton;

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
        data: `Desea actualizar el destinatario?`
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
          this.router.navigate(['/parcels/make-parcel/edit-receiver', this.localStorage.getEncryptedData("receiverId")]);
        }, 2000)
      })
  }

  createParcel(): void {
    const commission: NewCommission = {
      description: "a",
      // customerId: this.customerService.getCustomer.customerId,
      customerId: '1',
      // receiverId: this.receiver.receiverId
      receiverId: '1',
      // receiverId: this.localStorage.getEncryptedData("receiverId"),
    };

    this.parcelService.createCommission(commission)
      .subscribe();
  }


  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }

  public addNewPackage(): void {
    if (!this.backButtonEnable.getEnableButton) {
      this.backButtonEnable.setEnableButtton = !this.backButtonEnable.getEnableButton;
      this.router.navigate(['/parcels/make-parcel/create-packages/list-of-packages']);
    } else {
      this.router.navigate(['/parcels/make-parcel/create-packages/choose-type-of-package']);
    }
  }

  public alert(): void {
    if (this.getCurrentReceiver.receiverId) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: `Si vuelve atras se eliminara el destinatario ingresado.`
      });

      dialogRef.afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.receiverService.deleteReceiver(this.getCurrentReceiver.receiverId)),
          filter(wasUpdated => wasUpdated)
        )
        .subscribe(() => {
          this.showSnackbar(`Destinatario eliminado!`);
          this.router.navigate(['/home']);
        })
        return;
    } else {
      this.router.navigate(['/home']);
    }
  }

  public modifyEnableButton(): void {
    this.backButtonEnable.modifyEnableButton();
  }
}
