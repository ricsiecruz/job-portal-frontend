import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerMainComponent } from './employer-main.component';

describe('EmployerMainComponent', () => {
  let component: EmployerMainComponent;
  let fixture: ComponentFixture<EmployerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
