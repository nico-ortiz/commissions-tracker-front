import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CreateReceiverPageComponent } from './pages/create-receiver-page/create-receiver-page.component';
import { CreateParcelPageComponent } from './pages/create-package-page/create-parcel-page.component';
import { CreateEnvelopePageComponent } from './pages/create-envelope-parcel-page/create-envelope-parcel-page.component';
import { CreateApplianceParcelPageComponent } from './pages/create-appliance-parcel-page/create-appliance-parcel-page.component';
import { ChooseTypeOfPackageComponent } from './pages/choose-type-of-package/choose-type-of-package.component';
import { ListOfPackagesComponent } from './pages/list-of-packages/list-of-packages.component';

const routes: Routes = [
  {
    path: '',
    component: CreateReceiverPageComponent,
  },
  {
    path: 'create-receiver',
    component: CreateReceiverPageComponent,
  },
  {
    path: 'edit-receiver/:id',
    component: CreateReceiverPageComponent,
  },
  {
    path: 'create-packages',
    component: LayoutPageComponent,
    children: [
      {
        path: 'add-parcel',
        component: CreateParcelPageComponent
      },
      {
        path: 'edit-parcel/:id',
        component: CreateParcelPageComponent
      },
      {
        path: 'add-envelope',
        component: CreateEnvelopePageComponent,
      },
      {
        path: 'edit-envelope/:id',
        component: CreateEnvelopePageComponent
      },
      {
        path: 'add-appliance',
        component: CreateApplianceParcelPageComponent,
      },
      {
        path: 'edit-appliance/:id',
        component: CreateApplianceParcelPageComponent,
      },
      {
        path: 'choose-type-of-package',
        component: ChooseTypeOfPackageComponent,
      },
      {
        path: 'list-of-packages',
        component: ListOfPackagesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsParcelRoutingModule { }
