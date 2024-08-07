import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CreateReceiverPageComponent } from './pages/create-receiver-page/create-receiver-page.component';
import { CreatePackagePageComponent } from './pages/create-package-page/create-package-page.component';

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
    component: CreateReceiverPageComponent
  },
  {
    path: 'create-packages',
    component: CreatePackagePageComponent,
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
