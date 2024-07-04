import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'shared-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {

  public currentParagraph : number = 1;
  private interval: any;

  ngOnInit(): void {
    this.intervalStart();
  }

  ngOnDestroy(): void {
    this.clearInveral();
  }

  public intervalStart():void {
    this.clearInveral();
    this.interval = setInterval(() => {
      this.currentParagraph = (this.currentParagraph < 3 ? this.currentParagraph + 1 : 1);
    }, 5000);
  }

  public clearInveral():void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public showParagraph(btnNumber: number):void {
    if (btnNumber === 1) {
      this.currentParagraph = 1;
      this.intervalStart();
    } else if (btnNumber === 2) {
      this.currentParagraph = 2;
      this.intervalStart();
    } else {
      this.currentParagraph = 3;
      this.intervalStart();
    }
  }
}
