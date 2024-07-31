import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteParcelPageComponent } from './quote-parcel-page.component';

describe('QuoteParcelPageComponent', () => {
  let component: QuoteParcelPageComponent;
  let fixture: ComponentFixture<QuoteParcelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteParcelPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteParcelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
