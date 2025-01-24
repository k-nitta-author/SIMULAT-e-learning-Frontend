import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailPageComponent } from './challenge-detail-page.component';

describe('ChallengeDetailPageComponent', () => {
  let component: ChallengeDetailPageComponent;
  let fixture: ComponentFixture<ChallengeDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChallengeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
