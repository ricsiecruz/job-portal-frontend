import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInvitesComponent } from './candidate-invites.component';

describe('CandidateInvitesComponent', () => {
  let component: CandidateInvitesComponent;
  let fixture: ComponentFixture<CandidateInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateInvitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
