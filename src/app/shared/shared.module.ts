import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ErrorFieldComponent } from './components/error-field/error-field.component';



@NgModule({
  declarations: [
    ErrorFieldComponent,
    HeaderComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ErrorFieldComponent,
    HeaderComponent,
    HomePageComponent
  ]
})
export class SharedModule { }
