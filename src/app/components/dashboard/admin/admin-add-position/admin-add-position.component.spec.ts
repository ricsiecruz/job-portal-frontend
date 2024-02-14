import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPositionComponent } from './admin-add-position.component';

describe('AdminAddPositionComponent', () => {
  let component: AdminAddPositionComponent;
  let fixture: ComponentFixture<AdminAddPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
