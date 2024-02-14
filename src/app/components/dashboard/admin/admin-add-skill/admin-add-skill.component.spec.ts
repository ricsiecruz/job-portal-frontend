import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSkillComponent } from './admin-add-skill.component';

describe('AdminAddSkillComponent', () => {
  let component: AdminAddSkillComponent;
  let fixture: ComponentFixture<AdminAddSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
