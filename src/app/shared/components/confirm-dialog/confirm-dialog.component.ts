import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../customers/interfaces/customer';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: ``
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
