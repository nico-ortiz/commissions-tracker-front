import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeParcelPageComponent } from './make-parcel-page.component';

describe('MakeParcelPageComponent', () => {
  let component: MakeParcelPageComponent;
  let fixture: ComponentFixture<MakeParcelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeParcelPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeParcelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
