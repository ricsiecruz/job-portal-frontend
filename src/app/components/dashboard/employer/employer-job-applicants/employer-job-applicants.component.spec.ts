import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobApplicantsComponent } from './employer-job-applicants.component';

describe('EmployerJobApplicantsComponent', () => {
  let component: EmployerJobApplicantsComponent;
  let fixture: ComponentFixture<EmployerJobApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobApplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerJobApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
