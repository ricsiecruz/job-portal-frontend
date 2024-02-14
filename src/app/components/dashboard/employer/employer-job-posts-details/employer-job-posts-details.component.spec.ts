import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobPostsDetailsComponent } from './employer-job-posts-details.component';

describe('EmployerJobPostsDetailsComponent', () => {
  let component: EmployerJobPostsDetailsComponent;
  let fixture: ComponentFixture<EmployerJobPostsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobPostsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerJobPostsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
