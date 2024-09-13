import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

import { BackButtonService } from '../../../../shared/services/back-button.service';
import { IParcel } from '../../interfaces/parcel.interface';
import { PackageService } from './../../services/package.service';

@Component({
  selector: 'operation-create-parcel-page',
  templateUrl: './create-parcel-page.component.html',
  styleUrl: './create-parcel-page.component.css'
})
export class CreateParcelPageComponent implements OnInit {
  public parcelForm: FormGroup = this.fb.group({
    packageId: [''],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: [''],
    weight: [''],
    packageType: ['', [Validators.required]]
  });

  public activeButton!: boolean;
  public activeTitle!: boolean;
  public parcel!: IParcel;

  constructor(
    private fb: FormBuilder,
    private backButton: BackButtonService,
    private router: Router,
    private parcelService: PackageService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activeButton = this.backButton.getEnableButton;
    this.activeTitle = this.backButton.getActiveTitle;

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.parcelService.getPackageById(id)),
      )
      .subscribe( pkg => {
        if (!pkg) return this.router.navigate(['/']);
        return this.parcelForm.reset(pkg);
      }
      )
  }

  public onSubmit(): void {
    if (this.parcelForm.invalid) return ;

    if (this.currentParcel.packageId) {
      this.parcelService.updateParcel(this.currentParcel.packageId, this.currentParcel.description, this.currentParcel.packageType)
        .subscribe((res) => {
          if (res) {
            this.showSnackbar(`Paquete actualizado`);
            setTimeout(() => this.router.navigate(['/parcels/make-parcel/create-packages/list-of-packages']),
              2000);
          } else {
            this.showSnackbar(`Error al actualizar`);
          }
        })
    } else {
      this.parcelService.addParcelToCommission(this.currentParcel.description, this.currentParcel.packageType)
        .subscribe( pkg => {
          this.showSnackbar('Paquete añadido correctamente');
          setTimeout(() => {
            this.router.navigate(['/parcels/make-parcel/create-packages/list-of-packages'])
          }, 2000)
        }
        );
    }
  }

  get currentParcel(): IParcel {
    this.parcel = this.parcelForm.value as IParcel;
    return this.parcel;
  }

  get isValidForm(): boolean {
    return this.parcelForm.valid;
  }

  get isPristineForm(): boolean {
    return this.parcelForm.pristine;
  }

  public modifyActiveButton(): void {
    this.backButton.modifyEnableButton();
  }

  public showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }
}
