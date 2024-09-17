import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ParcelsRoutingModule } from './parcels-routing.module';
import { QuoteParcelPageComponent } from './pages/quote-parcel-page/quote-parcel-page.component';
import { SharedModule } from '../shared/shared.module';
import { TrackingParcelPageComponent } from './pages/tracking-parcel-page/tracking-parcel-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    QuoteParcelPageComponent,
    TrackingParcelPageComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ParcelsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ParcelsModule { }
