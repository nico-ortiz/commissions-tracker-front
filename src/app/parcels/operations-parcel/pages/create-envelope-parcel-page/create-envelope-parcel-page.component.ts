import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BackButtonService } from '../../../../shared/services/back-button.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEnvelope } from '../../interfaces/envelope.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackageService } from '../../services/package.service';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'operation-create-envelope-parcel-page',
  templateUrl: './create-envelope-parcel-page.component.html',
  styleUrl: './create-envelope-parcel-page.component.css'
})
export class CreateEnvelopePageComponent implements OnInit {
  public envelopeForm: FormGroup = this.fb.group({
    packageId: [''],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price:[''],
    packageType: ['']

  });

  private envelope!: IEnvelope;
  public activeButton!: boolean;

  constructor(
    private fb: FormBuilder,
    private parcelService: PackageService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private backButton: BackButtonService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.activeButton = this.backButton.getEnableButton;

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.parcelService.getPackageById(id)),
      )
      .subscribe( pkg => {
        if (!pkg) return this.router.navigate(['/']);
        return this.envelopeForm.reset(pkg);
      }
      )
  }

  public modifyActiveButton(): void {
    this.backButton.modifyEnableButton();
  }

  get currentEnvelope(): IEnvelope {
    this.envelope = this.envelopeForm.value as IEnvelope;
    return this.envelope;
  }

  public onSubmit(): void {
    if (this.envelopeForm.invalid) return ;

    if (this.currentEnvelope.packageId) {
      this.parcelService.updateEnvelope(this.currentEnvelope.packageId, this.currentEnvelope.description)
        .subscribe((res) => {
          if (res) {
            this.showSnackbar(`Sobre actualizado`);
            setTimeout(() => this.router.navigate(['/parcels/make-parcel/create-packages/list-of-packages']),
              2000);
          } else {
            this.showSnackbar(`Error al actualizar`);
          }
        })
    } else {
      this.parcelService.addEnvelopeToCommission(this.currentEnvelope.description)
        .subscribe( envelope => {
          this.showSnackbar('Sobre añadido correctamente');
          setTimeout(() => {
            this.router.navigate(['/parcels/make-parcel/create-packages/list-of-packages'])
          }, 2000)
        }
        );
    }
  }

  get isValidForm(): boolean {
    return this.envelopeForm.valid;
  }


  get isPristineForm(): boolean {
    return this.envelopeForm.pristine;
  }

  public showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }
}
