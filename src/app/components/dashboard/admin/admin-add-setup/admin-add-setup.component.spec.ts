import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSetupComponent } from './admin-add-setup.component';

describe('AdminAddSetupComponent', () => {
  let component: AdminAddSetupComponent;
  let fixture: ComponentFixture<AdminAddSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
