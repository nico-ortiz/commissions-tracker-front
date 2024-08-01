import { Component, Input } from '@angular/core';
import { ToggleButtonService } from '../../services/toggle-button.service';
import { animate, style, transition, trigger } from '@angular/animations';

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
    private toggleBtn: ToggleButtonService
  ) {}

  public getToggleBtnStatus(): boolean {
    return this.toggleBtn.getSideNavbar;
  }

  public onToggleBtnStatus(): void {
    this.toggleBtn.toggleSideNavBar();
  }
}
