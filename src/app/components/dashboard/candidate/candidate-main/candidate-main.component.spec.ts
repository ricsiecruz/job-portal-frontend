import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMainComponent } from './candidate-main.component';

describe('CandidateMainComponent', () => {
  let component: CandidateMainComponent;
  let fixture: ComponentFixture<CandidateMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
