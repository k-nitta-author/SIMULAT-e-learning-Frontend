import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityHallComponent } from './community-hall.component';

describe('CommunityHallComponent', () => {
  let component: CommunityHallComponent;
  let fixture: ComponentFixture<CommunityHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityHallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunityHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
