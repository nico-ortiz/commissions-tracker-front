import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { phoneNumberValidator } from '../../../../customers/phone-number.directive';

@Component({
  selector: 'operation-create-receiver-page',
  templateUrl: './create-receiver-page.component.html',
  styleUrl: './create-receiver-page.component.css'
})
export class CreateReceiverPageComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    receiverId: [''],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), phoneNumberValidator(/[0-9]{3}-[0-9]{1}-[0-9]{6}/)]],
    date: ['', [Validators.required]],
    openingTime: [, [Validators.required]],
    closingTime: [, [Validators.required]],
  });

  public today!: string;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const todayDate = new Date();
    const yyyy = todayDate.getFullYear();
    const mm   = todayDate.getMonth();
    const dd   = todayDate.getDay();
    this.today = `${yyyy}-${mm}-${dd}`;
  }
}
