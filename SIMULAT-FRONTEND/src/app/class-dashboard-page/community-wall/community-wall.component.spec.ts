import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityWallComponent } from './community-wall.component';

describe('CommunityWallComponent', () => {
  let component: CommunityWallComponent;
  let fixture: ComponentFixture<CommunityWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityWallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunityWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
