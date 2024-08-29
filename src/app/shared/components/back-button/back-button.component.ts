import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-back-button',
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {

  @Input()
  public routerLink!: string;

  @Input()
  public text!: string;
}
