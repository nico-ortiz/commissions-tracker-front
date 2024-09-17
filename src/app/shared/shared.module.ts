import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ErrorFieldComponent } from './components/error-field/error-field.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedRoutingModule } from './shared-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { BackButtonComponent } from './components/back-button/back-button.component';



@NgModule({
  declarations: [
    ErrorFieldComponent,
    HeaderComponent,
    HomePageComponent,
    ConfirmDialogComponent,
    SideNavbarComponent,
    BackButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    SharedRoutingModule
  ],
  exports: [
    BackButtonComponent,
    ErrorFieldComponent,
    HeaderComponent,
    HomePageComponent,
    SideNavbarComponent,
  ]
})
export class SharedModule { }
