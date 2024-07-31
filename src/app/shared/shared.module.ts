import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ErrorFieldComponent } from './components/error-field/error-field.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    ErrorFieldComponent,
    HeaderComponent,
    HomePageComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    SharedRoutingModule
  ],
  exports: [
    ErrorFieldComponent,
    HeaderComponent,
    HomePageComponent
  ]
})
export class SharedModule { }
