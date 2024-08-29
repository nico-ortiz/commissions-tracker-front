import { Component, OnInit } from '@angular/core';
import { ParcelService } from '../../services/parcel.service';
import { Package } from '../../interfaces/package.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ReceiverService } from '../../services/receiver.service';
import { Receiver } from '../../interfaces/receiver.interface';
import { Envelope } from '../../interfaces/envelope.interface';
import { Bigger } from '../../interfaces/bigger.interface';
import { Parcel } from '../../interfaces/parcel.interface';
import { Router } from '@angular/router';
import { BackButtonService } from '../../../../shared/services/back-button.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-of-packages',
  templateUrl: './list-of-packages.component.html',
  styleUrl: './list-of-packages.component.css'
})
export class ListOfPackagesComponent implements OnInit {

  public packages: Package[] = [];

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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.parcelService.getPackagesOfCommission(this.localStorage.getEncryptedData("commissionId"))
      .subscribe(packages => {
        packages.map((pkg) => {
          switch(pkg.packageType) {
            case 0:
              return pkg as Envelope;
            case 4:
              return pkg as Bigger;
            default:
              return pkg as Parcel;
          }
        });
        this.packages = packages;
      });

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

  public addNewPackage(): void {
    if (this.backButtonEnable.getEnableButton) {
      this.backButtonEnable.setEnableButtton = !this.backButtonEnable.getEnableButton;
    }
    this.router.navigate(['/parcels/make-parcel/create-packages/choose-type-of-package']);
  }

  public deletePackage(index: number): void {
    // const pkg : Package = this.packages[index];

    // const dialogRef = this.dialog.open

    // dialogRef.afterClosed()
    //   .pipe(

    //   )
  }
}
