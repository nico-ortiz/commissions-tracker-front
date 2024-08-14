import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatePackagePageComponent } from './pages/create-package-page/create-package-page.component';
import { CreateReceiverPageComponent } from './pages/create-receiver-page/create-receiver-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { OperationsParcelRoutingModule } from './operations-parcel-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatIcon } from '@angular/material/icon';
import { PackageTypeComponent } from './components/package-type/package-type.component';
import { CreateEnvelopeParcelPageComponent } from './pages/create-envelope-parcel-page/create-envelope-parcel-page.component';
import { CreateApplianceParcelPageComponent } from './pages/create-appliance-parcel-page/create-appliance-parcel-page.component';



@NgModule({
  declarations: [
    CreatePackagePageComponent,
    CreateReceiverPageComponent,
    LayoutPageComponent,
    PackageTypeComponent,
    CreateEnvelopeParcelPageComponent,
    CreateApplianceParcelPageComponent
  ],
  imports: [
    CommonModule,
    MatIcon,
    OperationsParcelRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class OperationsParcelModule { }
