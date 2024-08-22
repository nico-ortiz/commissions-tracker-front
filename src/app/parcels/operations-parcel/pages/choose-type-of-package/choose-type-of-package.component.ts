import { Component } from '@angular/core';
import { ReceiverService } from '../../services/receiver.service';
import { Receiver } from '../../interfaces/receiver.interface';

@Component({
  selector: 'app-choose-type-of-package',
  templateUrl: './choose-type-of-package.component.html',
  styleUrl: './choose-type-of-package.component.css'
})
export class ChooseTypeOfPackageComponent {
  constructor(
    private receiverService: ReceiverService
  ) {
  }

  public get receiver(): Receiver {
    return this.receiverService.getReceiver;
  }

  public getPath(): string {
    return '/parcels/make-parcel/edit-receiver/' + this.receiver.receiverId;
  }
}
