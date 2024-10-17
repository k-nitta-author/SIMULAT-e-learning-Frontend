import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyChallengeComponent } from './daily-challenge.component';

describe('DailyChallengeComponent', () => {
  let component: DailyChallengeComponent;
  let fixture: ComponentFixture<DailyChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyChallengeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
