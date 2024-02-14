import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAboutComponent } from './employer-about.component';

describe('EmployerAboutComponent', () => {
  let component: EmployerAboutComponent;
  let fixture: ComponentFixture<EmployerAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
