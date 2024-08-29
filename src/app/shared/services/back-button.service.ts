import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class BackButtonService {
  constructor() { }

  public enableButton: boolean = true;

  set setEnableButtton(enable: boolean) {
    this.enableButton = enable;
  }

  get getEnableButton(): boolean {
    return this.enableButton;
  }

}
