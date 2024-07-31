import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../shared/pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MakeParcelPageComponent } from './pages/make-parcel-page/make-parcel-page.component';
import { QuoteParcelPageComponent } from './pages/quote-parcel-page/quote-parcel-page.component';
import { TrackingParcelPageComponent } from './pages/tracking-parcel-page/tracking-parcel-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'make-parcel',
        component: MakeParcelPageComponent
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
