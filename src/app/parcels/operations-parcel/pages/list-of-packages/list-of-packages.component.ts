import { Component, OnInit } from '@angular/core';
import { ParcelService } from '../../services/package.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ReceiverService } from '../../services/receiver.service';
import { Receiver } from '../../interfaces/receiver.interface';
import { Router } from '@angular/router';
import { BackButtonService } from '../../../../shared/services/back-button.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPackage } from '../../interfaces/package.interface';
import { IEnvelope } from '../../interfaces/envelope.interface';
import { IBigger } from '../../interfaces/bigger.interface';
import { IParcel } from '../../interfaces/parcel.interface';

@Component({
  selector: 'app-list-of-packages',
  templateUrl: './list-of-packages.component.html',
  styleUrl: './list-of-packages.component.css'
})
export class ListOfPackagesComponent implements OnInit {

  public packages: IPackage[] = [];

    public images = [
      {
        src: '../../../assets/images/icons8-envelope-64.png',
        alt: 'Sobre'
      },
      {
        src: '../../../assets/images/icons8-package-64.png',
        alt: 'Paquete'
      },
      {
        src: '../../../assets/images/icons8-appliances-80.png',
        alt: 'Bigger'
      },
    ];

  public receiver!: Receiver;

  constructor(
    private router: Router,
    private parcelService: ParcelService,
    private receiverSerivce: ReceiverService,
    private localStorage: LocalStorageService,
    private backButtonEnable: BackButtonService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchPackages();
    this.receiverSerivce.getReceiverById(this.localStorage.getEncryptedData("receiverId"))
      .subscribe(receiver => this.receiver = receiver);
  }

  public imageByPackageType(type: string) {
    if (type === 'SOBRE') {
      return this.images[0];
    } else if (type === 'BIGGER') {
      return this.images[2];
    } else {
      return this.images[1];
    }
  }

  public fetchPackages(): void {
    this.parcelService.getPackagesOfCommission(this.localStorage.getEncryptedData("commissionId"))
      .subscribe(packages => {
        packages.map((pkg) => {
          switch(pkg.packageType) {
            case 0:
              return pkg as IEnvelope;
            case 4:
              return pkg as IBigger;
            default:
              return pkg as IParcel;
          }
        });
        this.packages = packages;
      });
  }

  public addNewPackage(): void {
    if (this.backButtonEnable.getEnableButton) {
      this.backButtonEnable.setEnableButtton = !this.backButtonEnable.getEnableButton;
    }
    this.router.navigate(['/parcels/make-parcel/create-packages/choose-type-of-package']);
  }

  public deletePackage(index: number): void {
    const pkg: IPackage  = this.packages[index];
    if (this.packages.length === 1) {
      const dialogWarning = this.dialog.open(
        ConfirmDialogComponent,
        {
          data: `Si elimina este elemento, se eliminara la comision`
        }
      );

      dialogWarning.afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => {
            return this.parcelService.deleteCommission(this.localStorage.getEncryptedData("commissionId"));
          }),
          filter(wasDeleted => wasDeleted)
        ).subscribe(() => {
          this.showSnackbar(`Comision elminada`);
        });

      setTimeout(() => {
        this.receiverSerivce.deleteReceiver(this.localStorage.getEncryptedData("receiverId"))
        .subscribe(() => {
          this.router.navigate(['./']);
        });
      }, 3000);

    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: `${"Esta a punto de borrar"} ${pkg.packageType}.
        Descripcion: ${pkg.description} ${pkg.packageId}`
      })

      dialogRef.afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => {
            return this.parcelService.deletePackageOfCommission(pkg.packageId);
          }),
          filter(wasDeleted => wasDeleted)
        )
        .subscribe(() => {
          this.showSnackbar(`Paquete eliminado`);
          this.fetchPackages();
        });
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }
}
