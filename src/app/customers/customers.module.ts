import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';


@NgModule({
  declarations: [
    CustomerPageComponent,
    LayoutPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomersModule { }
