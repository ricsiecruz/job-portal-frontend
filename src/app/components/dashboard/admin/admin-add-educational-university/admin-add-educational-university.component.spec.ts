import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEducationalUniversityComponent } from './admin-add-educational-university.component';

describe('AdminAddEducationalUniversityComponent', () => {
  let component: AdminAddEducationalUniversityComponent;
  let fixture: ComponentFixture<AdminAddEducationalUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddEducationalUniversityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEducationalUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
