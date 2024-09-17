import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

import { BackButtonService } from '../../../../shared/services/back-button.service';
import { IEnvelope } from '../../interfaces/envelope.interface';
import { PackageService } from '../../services/package.service';


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
  public updatedTitle!: boolean;

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
    this.updatedTitle = this.backButton.getActiveTitle;

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
