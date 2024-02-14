import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEducationalDegreeComponent } from './admin-add-educational-degree.component';

describe('AdminAddEducationalDegreeComponent', () => {
  let component: AdminAddEducationalDegreeComponent;
  let fixture: ComponentFixture<AdminAddEducationalDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddEducationalDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEducationalDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
