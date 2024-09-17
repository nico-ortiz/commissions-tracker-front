import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ChooseTypeOfPackageComponent } from './pages/choose-type-of-package/choose-type-of-package.component';
import { CreateApplianceParcelPageComponent } from './pages/create-appliance-parcel-page/create-appliance-parcel-page.component';
import { CreateEnvelopePageComponent } from './pages/create-envelope-parcel-page/create-envelope-parcel-page.component';
import { CreateParcelPageComponent } from './pages/create-package-page/create-parcel-page.component';
import { CreateReceiverPageComponent } from './pages/create-receiver-page/create-receiver-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListOfPackagesComponent } from './pages/list-of-packages/list-of-packages.component';
import { MatIcon } from '@angular/material/icon';
import { OperationsParcelRoutingModule } from './operations-parcel-routing.module';
import { PackageTypeComponent } from './components/package-type/package-type.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ChooseTypeOfPackageComponent,
    CreateApplianceParcelPageComponent,
    CreateEnvelopePageComponent,
    CreateParcelPageComponent,
    CreateReceiverPageComponent,
    LayoutPageComponent,
    ListOfPackagesComponent,
    PackageTypeComponent,
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
