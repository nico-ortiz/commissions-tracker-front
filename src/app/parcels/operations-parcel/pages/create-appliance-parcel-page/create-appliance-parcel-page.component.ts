import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackButtonService } from '../../../../shared/services/back-button.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { IBigger } from '../../interfaces/bigger.interface';

@Component({
  selector: 'app-create-appliance-parcel-page',
  templateUrl: './create-appliance-parcel-page.component.html',
  styleUrl: './create-appliance-parcel-page.component.css'
})
export class CreateApplianceParcelPageComponent {

  public biggerForm: FormGroup = this.fb.group({
    packageId: [''],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: [''],
    weight: ['', [Validators.required, Validators.min(50), Validators.max(150)]],
    width: ['', [Validators.required, Validators.min(10), Validators.max(180)]],
    height: ['', [Validators.required, Validators.min(30), Validators.max(180)]],
    packageType: ['']
  });

  public bigger!: IBigger;
  public activeButton!: boolean;
  public updateTitle!:  boolean;

  constructor(
    private fb: FormBuilder,
    private backButton: BackButtonService,
    private router: Router,
    private biggerService: PackageService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activeButton = this.backButton.getEnableButton;
    this.updateTitle = this.backButton.getActiveTitle;

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.biggerService.getPackageById(id)),
      )
      .subscribe( pkg => {
        if (!pkg) return this.router.navigate(['/']);
        return this.biggerForm.reset(pkg);
      }
      )
  }

  public onSubmit(): void {
    if (this.biggerForm.invalid) return ;

    if (this.currentBigger.packageId) {
      this.biggerService.updateBigger(this.currentBigger.packageId, this.currentBigger.description, this.currentBigger.width, this.currentBigger.height, this.currentBigger.weight)
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
      this.biggerService.addBiggerToCommission(
                this.currentBigger.description,
                this.currentBigger.width,
                this.currentBigger.height,
                this.currentBigger.weight
              )
        .subscribe( pkg => {
          this.showSnackbar('Paquete añadido correctamente');
          setTimeout(() => {
            this.router.navigate(['/parcels/make-parcel/create-packages/list-of-packages'])
          }, 2000)
        }
        );
    }
  }

  get currentBigger(): IBigger {
    this.bigger = this.biggerForm.value as IBigger;
    return this.bigger;
  }

  get isValidForm(): boolean {
    return this.biggerForm.valid;
  }

  get isPristineForm(): boolean {
    return this.biggerForm.pristine;
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
