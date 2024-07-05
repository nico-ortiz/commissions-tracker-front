import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QaSectionComponent } from './components/qa-section/qa-section.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomePageComponent,
    QaSectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    HomePageComponent
  ]
})
export class SharedModule { }
