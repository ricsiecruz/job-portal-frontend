import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAddJobPostComponent } from './employer-add-job-post.component';

describe('EmployerAddJobPostComponent', () => {
  let component: EmployerAddJobPostComponent;
  let fixture: ComponentFixture<EmployerAddJobPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerAddJobPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerAddJobPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
