import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CreateReceiverPageComponent } from './pages/create-receiver-page/create-receiver-page.component';
import { CreatePackagePageComponent } from './pages/create-package-page/create-package-page.component';
import { CreateEnvelopeParcelPageComponent } from './pages/create-envelope-parcel-page/create-envelope-parcel-page.component';
import { CreateApplianceParcelPageComponent } from './pages/create-appliance-parcel-page/create-appliance-parcel-page.component';

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
        path: 'add-package',
        component: CreatePackagePageComponent
      },
      {
        path: 'add-envelope',
        component: CreateEnvelopeParcelPageComponent,
      },
      {
        path: 'add-appliance',
        component: CreateApplianceParcelPageComponent,
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
