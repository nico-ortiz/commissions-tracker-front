import { Component, Input } from '@angular/core';
import { ToggleButtonService } from '../../services/toggle-button.service';

@Component({
  selector: 'shared-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
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
