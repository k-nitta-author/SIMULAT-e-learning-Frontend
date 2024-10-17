import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRankingsComponent } from './class-rankings.component';

describe('ClassRankingsComponent', () => {
  let component: ClassRankingsComponent;
  let fixture: ComponentFixture<ClassRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassRankingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
