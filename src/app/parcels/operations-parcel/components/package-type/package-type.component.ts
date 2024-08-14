import { Component, Input } from '@angular/core';

@Component({
  selector: 'operation-package-type',
  templateUrl: './package-type.component.html',
  styleUrl: './package-type.component.css'
})
export class PackageTypeComponent {
  @Input()
  public urlImage!: string;

  @Input()
  public link!: string;

  @Input()
  public title!: string;


}
