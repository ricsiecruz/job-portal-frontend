import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEducationalDegreeComponent } from './admin-educational-degree.component';

describe('AdminEducationalDegreeComponent', () => {
  let component: AdminEducationalDegreeComponent;
  let fixture: ComponentFixture<AdminEducationalDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEducationalDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEducationalDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
