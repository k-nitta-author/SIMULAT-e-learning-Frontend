import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsPageComponent } from './rankings-page.component';

describe('RankingsPageComponent', () => {
  let component: RankingsPageComponent;
  let fixture: ComponentFixture<RankingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
