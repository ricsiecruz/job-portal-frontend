import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEducationalUniversityComponent } from './admin-educational-university.component';

describe('AdminEducationalUniversityComponent', () => {
  let component: AdminEducationalUniversityComponent;
  let fixture: ComponentFixture<AdminEducationalUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEducationalUniversityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEducationalUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
