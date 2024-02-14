import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEducationalCourseComponent } from './admin-educational-course.component';

describe('AdminEducationalCourseComponent', () => {
  let component: AdminEducationalCourseComponent;
  let fixture: ComponentFixture<AdminEducationalCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEducationalCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEducationalCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
