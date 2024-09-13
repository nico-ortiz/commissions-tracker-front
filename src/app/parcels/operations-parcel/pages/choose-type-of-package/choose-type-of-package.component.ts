import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { BackButtonService } from '../../../../shared/services/back-button.service';

@Component({
  selector: 'operation-choose-type-of-package',
  templateUrl: './choose-type-of-package.component.html',
  styleUrl: './choose-type-of-package.component.css'
})
export class ChooseTypeOfPackageComponent implements OnInit {

  public activeButton!: boolean;

  constructor(
    private localStorage: LocalStorageService,
    private backButtonEnable: BackButtonService
  ) {
  }

  ngOnInit(): void {
    this.activeButton = this.backButtonEnable.getEnableButton;
    if (this.backButtonEnable.getActiveTitle) {
      this.backButtonEnable.modifyTitleActive();
    }
  }

  public getPathToEditReceiver(): string {
    return '/parcels/make-parcel/edit-receiver/' + this.localStorage.getEncryptedData("receiverId");
  }

  public getPathToReturnToListOfPackages(): string {
    return '/parcels/make-parcel/create-packages/list-of-packages';
  }
}
