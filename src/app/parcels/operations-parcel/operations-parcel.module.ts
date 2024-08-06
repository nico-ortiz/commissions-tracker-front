import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatePackagePageComponent } from './pages/create-package-page/create-package-page.component';
import { CreateReceiverPageComponent } from './pages/create-receiver-page/create-receiver-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { OperationsParcelRoutingModule } from './operations-parcel-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CreatePackagePageComponent,
    CreateReceiverPageComponent,
    LayoutPageComponent,
  ],
  imports: [
    CommonModule,
    OperationsParcelRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class OperationsParcelModule { }
