import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinBoardFormComponent } from './bulletin-board-form.component';

describe('BulletinBoardFormComponent', () => {
  let component: BulletinBoardFormComponent;
  let fixture: ComponentFixture<BulletinBoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulletinBoardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulletinBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
