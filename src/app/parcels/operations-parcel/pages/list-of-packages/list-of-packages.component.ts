import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { BackButtonService } from '../../../../shared/services/back-button.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { IBigger } from '../../interfaces/bigger.interface';
import { IEnvelope } from '../../interfaces/envelope.interface';
import { IPackage } from '../../interfaces/package.interface';
import { IParcel } from '../../interfaces/parcel.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { PackageType } from '../../interfaces/enums/package-type.enum';
import { PackageService } from '../../services/package.service';
import { Receiver } from '../../interfaces/receiver.interface';
import { ReceiverService } from '../../services/receiver.service';

@Component({
  selector: 'operation-list-of-packages',
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
    private packageService: PackageService,
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
    this.packageService.getPackagesOfCommission(this.localStorage.getEncryptedData("commissionId"))
      .subscribe(packages => {
        packages.map((pkg) => {
          switch(pkg.packageType) {
            case "SOBRE":
              return pkg as IEnvelope;
            case "BIGGER":
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
      this.backButtonEnable.modifyEnableButton();
    }
    this.router.navigate(['/parcels/make-parcel/create-packages/choose-type-of-package']);
  }

  public deletePackage(index: number): void {
    const pkg: IPackage  = this.packages[index];
    if (this.packages.length === 1) {
      const dialogWarning = this.dialog.open(
        ConfirmDialogComponent,
        {
          data: `Si elimina este paquete, se eliminara la comision`
        }
      );

      dialogWarning.afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => {
            return this.packageService.deleteCommission(this.localStorage.getEncryptedData("commissionId"));
          }),
          filter(wasDeleted => wasDeleted)
        )
        .pipe(
          switchMap(() => {
            return this.receiverSerivce.deleteReceiver(this.localStorage.getEncryptedData("receiverId"));
          }),
        )
        .subscribe(() => {
          setTimeout(() => {
            this.showSnackbar(`Comision eliminada`);
            this.router.navigate(['./']);
          }, 2000);
        });
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: `${"Esta a punto de borrar"} ${pkg.packageType}.
        Descripcion: ${pkg.description}`
      })

      dialogRef.afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => {
            return this.packageService.deletePackageOfCommission(pkg.packageId);
          }),
          filter(wasDeleted => wasDeleted)
        )
        .subscribe(() => {
          this.showSnackbar(`Paquete eliminado`);
          this.fetchPackages();
        });
    }
  }

  public updatePackage(index: number): void {
    const pkg = this.packages[index];

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: `Esta seguro de actualizar la informacion de este sobre?`
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
      )
      .subscribe(result => {
        this.modifyButtonActivity();
        if (pkg.packageType === "SOBRE") {
          console.log(pkg);
          this.router.navigate(['/parcels/make-parcel/create-packages/edit-envelope/', pkg.packageId]);
        }
      });


  }

  public showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 3000,
    })
  }

  public getPathToUpdateReceiver(): string {
    return '/parcels/make-parcel/edit-receiver/' + this.localStorage.getEncryptedData("receiverId");
  }

  public modifyButtonActivity(): void {
    if (this.backButtonEnable) {
      this.backButtonEnable.setEnableButtton = false;
    }
  }
}
