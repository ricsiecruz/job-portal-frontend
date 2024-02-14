import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRateComponent } from './admin-rate.component';

describe('AdminRateComponent', () => {
  let component: AdminRateComponent;
  let fixture: ComponentFixture<AdminRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
