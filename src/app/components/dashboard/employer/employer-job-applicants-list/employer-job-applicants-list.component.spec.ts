import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobApplicantsListComponent } from './employer-job-applicants-list.component';

describe('EmployerJobApplicantsListComponent', () => {
  let component: EmployerJobApplicantsListComponent;
  let fixture: ComponentFixture<EmployerJobApplicantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobApplicantsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerJobApplicantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
