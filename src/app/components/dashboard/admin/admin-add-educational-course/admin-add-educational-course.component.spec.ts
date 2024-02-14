import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEducationalCourseComponent } from './admin-add-educational-course.component';

describe('AdminAddEducationalCourseComponent', () => {
  let component: AdminAddEducationalCourseComponent;
  let fixture: ComponentFixture<AdminAddEducationalCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddEducationalCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEducationalCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
