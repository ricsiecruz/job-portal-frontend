import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAppliedComponent } from './candidate-applied.component';

describe('CandidateAppliedComponent', () => {
  let component: CandidateAppliedComponent;
  let fixture: ComponentFixture<CandidateAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateAppliedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
