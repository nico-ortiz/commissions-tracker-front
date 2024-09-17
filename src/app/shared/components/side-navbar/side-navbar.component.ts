import { Component } from '@angular/core';
import { ToggleButtonService } from '../../services/toggle-button.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { PackageService } from '../../../parcels/operations-parcel/services/package.service';
@Component({
  selector: 'shared-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(0)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('200ms', style({transform: 'translateX(0)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class SideNavbarComponent {

  constructor(
    private toggleBtn: ToggleButtonService,
    private packageService: PackageService
  ) {}

  public getToggleBtnStatus(): boolean {
    return this.toggleBtn.getSideNavbar;
  }

  public onToggleBtnStatus(): void {
    this.toggleBtn.toggleSideNavBar();
  }

  public deleteCommission(path: string): void {
    this.onToggleBtnStatus();
    this.packageService.deleteAllData(path);
  }
}
