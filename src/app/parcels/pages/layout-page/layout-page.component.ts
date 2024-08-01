import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToggleButtonService } from '../../../shared/services/toggle-button.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit, OnDestroy {

  constructor(
    private toggleBtnService: ToggleButtonService
  ) {}

  ngOnInit(): void {
    this.toggleBtnService.setSideNavbarActive = true;
  }

  ngOnDestroy(): void {
    this.toggleBtnService.setSideNavbarActive = false;
  }
}
