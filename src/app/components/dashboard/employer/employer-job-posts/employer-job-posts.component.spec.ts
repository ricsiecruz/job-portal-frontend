import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobPostsComponent } from './employer-job-posts.component';

describe('EmployerJobPostsComponent', () => {
  let component: EmployerJobPostsComponent;
  let fixture: ComponentFixture<EmployerJobPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerJobPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
