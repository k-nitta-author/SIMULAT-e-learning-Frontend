import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsDetailComponent } from './terms-detail.component';

describe('TermsDetailComponent', () => {
  let component: TermsDetailComponent;
  let fixture: ComponentFixture<TermsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
