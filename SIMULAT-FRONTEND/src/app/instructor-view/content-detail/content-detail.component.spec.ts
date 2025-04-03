import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentDetailComponent } from './content-detail.component';
import { FormsModule } from '@angular/forms';

describe('ContentDetailComponent', () => {
  let component: ContentDetailComponent;
  let fixture: ComponentFixture<ContentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContentDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
