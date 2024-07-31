import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingParcelPageComponent } from './tracking-parcel-page.component';

describe('TrackingParcelPageComponent', () => {
  let component: TrackingParcelPageComponent;
  let fixture: ComponentFixture<TrackingParcelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingParcelPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackingParcelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
