import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})
export class BackButtonService {
  constructor(
    private localStorage: LocalStorageService
  ) { }

  public enableButton: boolean = true;
  public titleActive: boolean  = true;

  set setEnableButtton(enable: boolean) {
    this.enableButton = enable;
    this.localStorage.saveData("button", JSON.stringify(this.enableButton));
  }

  set setEnableTitle(enable: boolean) {
    this.titleActive = enable;
    this.localStorage.saveData("title", JSON.stringify(this.titleActive));
  }

  get getEnableButton(): boolean {
    return this.localStorage.getData("button") === "true";
  }

  get getActiveTitle(): boolean {
    return this.localStorage.getData("title") === "true";
  }

  public modifyEnableButton(): void {
    this.setEnableButtton = !this.getEnableButton;
  }

  public modifyTitleActive(): void {
    this.setEnableTitle = !this.titleActive;
  }
}
