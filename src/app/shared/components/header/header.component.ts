import { Component, Input } from '@angular/core';
import { CustomersService } from '../../../customers/services/customers.service';
import { Customer } from '../../../customers/interfaces/customer';
import { ToggleButtonService } from '../../services/toggle-button.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private customer: CustomersService,
    private toggleBtn: ToggleButtonService
  ) {}

  public getCustomer(): Customer | undefined {
    return this.customer.currentCustomer;
  }

  public logout(): void {
    this.customer.logout();
  }

  public toggleBtnStatus(): boolean {
    return this.toggleBtn.getSideNavbarActive;
  }

  public onToggleBtnStatus(): void {
    this.toggleBtn.toggleSideNavBar();
  }
}
