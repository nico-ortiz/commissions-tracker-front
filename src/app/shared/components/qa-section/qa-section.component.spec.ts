import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaSectionComponent } from './qa-section.component';

describe('QaSectionComponent', () => {
  let component: QaSectionComponent;
  let fixture: ComponentFixture<QaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QaSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
