import { Component } from '@angular/core';
import { CustomersService } from '../../../customers/services/customers.service';
import { Customer } from '../../../customers/interfaces/customer';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private customer: CustomersService
  ) {}

  public getCustomer(): Customer | undefined {
    return this.customer.currentCustomer;
  }

  public logout(): void {
    this.customer.logout();
  }
}
