import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { QuoteParcelPageComponent } from './pages/quote-parcel-page/quote-parcel-page.component';
import { TrackingParcelPageComponent } from './pages/tracking-parcel-page/tracking-parcel-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'make-parcel',
        loadChildren: () => import('./operations-parcel/operations-parcel.module').then(m => m.OperationsParcelModule),
      },
      {
        path: 'quote',
        component: QuoteParcelPageComponent
      },
      {
        path: 'tracking-parcel',
        component: TrackingParcelPageComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelsRoutingModule { }
