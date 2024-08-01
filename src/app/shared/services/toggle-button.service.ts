import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToggleButtonService {

  constructor() { }

  private isSideNavbarActive!: boolean;
  private isSideNavBarOpen!: boolean;

  set setSideNavbarActive(active: boolean) {
    this.isSideNavbarActive = active;
  }

  get getSideNavbarActive() {
    return this.isSideNavbarActive;
  }

  set setSideNavBar(open: boolean) {
    this.isSideNavBarOpen = open;
  }

  get getSideNavbar() {
    return this.isSideNavBarOpen;
  }

  public toggleSideNavBar(): void {
    this.setSideNavBar = !this.getSideNavbar;
  }
}
