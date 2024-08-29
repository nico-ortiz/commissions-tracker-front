import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParcelService } from '../../services/parcel.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Envelope } from '../../interfaces/envelope.interface';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-create-envelope-parcel-page',
  templateUrl: './create-envelope-parcel-page.component.html',
  styleUrl: './create-envelope-parcel-page.component.css'
})
export class CreateEnvelopeParcelPageComponent {
  public envelopeForm: FormGroup = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

  private envelope!: Envelope

  constructor(
    private fb: FormBuilder,
    private parcelService: ParcelService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

  }

  get currentEnvelope(): Envelope {
    this.envelope = this.envelopeForm.value as Envelope;
    return this.envelope;
  }

  public onSubmit(): void {
    console.log((this.envelopeForm.value as string));
    this.parcelService.addEnvelopeToCommission(this.currentEnvelope.description)
      .subscribe( envelope => {
        this.showSnackbar('Sobre añadido correctamente');
        setTimeout(() => {
          this.router.navigate(['/parcels/make-parcel/create-packages/list-of-packages'])
        }, 3000)
      }
      );
  }

  get isValidForm(): boolean {
    return this.envelopeForm.valid;
  }

  public showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }
}
