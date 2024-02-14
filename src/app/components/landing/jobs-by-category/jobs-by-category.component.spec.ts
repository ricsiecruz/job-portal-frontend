import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsByCategoryComponent } from './jobs-by-category.component';

describe('JobsByCategoryComponent', () => {
  let component: JobsByCategoryComponent;
  let fixture: ComponentFixture<JobsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsByCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
