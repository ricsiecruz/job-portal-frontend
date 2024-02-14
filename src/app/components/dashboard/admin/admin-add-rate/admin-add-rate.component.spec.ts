import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRateComponent } from './admin-add-rate.component';

describe('AdminAddRateComponent', () => {
  let component: AdminAddRateComponent;
  let fixture: ComponentFixture<AdminAddRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
