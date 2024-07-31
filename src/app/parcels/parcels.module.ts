import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcelsRoutingModule } from './parcels-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { MakeParcelPageComponent } from './pages/make-parcel-page/make-parcel-page.component';
import { QuoteParcelPageComponent } from './pages/quote-parcel-page/quote-parcel-page.component';
import { TrackingParcelPageComponent } from './pages/tracking-parcel-page/tracking-parcel-page.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LayoutPageComponent,
    MakeParcelPageComponent,
    QuoteParcelPageComponent,
    TrackingParcelPageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ParcelsRoutingModule,
    SharedModule,
  ]
})
export class ParcelsModule { }
