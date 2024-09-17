import { Component } from '@angular/core';
import { ReceiverService } from '../../services/receiver.service';
import { Receiver } from '../../interfaces/receiver.interface';

@Component({
  selector: 'operation-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  constructor(
    private receiverService: ReceiverService
  ) {
  }

  public getReceiver(): Receiver {
    return this.receiverService.getReceiver;
  }
}
