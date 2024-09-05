import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})
export class BackButtonService {
  constructor(
    private localStorage: LocalStorageService
  ) { }

  public enableButton: boolean = true;

  set setEnableButtton(enable: boolean) {
    this.enableButton = enable;
    this.localStorage.saveData("button", JSON.stringify(this.enableButton));
  }

  get getEnableButton(): boolean {
    return this.localStorage.getData("button") === "true";
  }

  public modifyEnableButton(): void {
    this.setEnableButtton = !this.getEnableButton;
  }

}
