import { Component } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { LandingService } from 'src/app/components/landing/landing.service';
import { environment } from 'src/environment';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-candidate-applied',
  templateUrl: './candidate-applied.component.html',
  styleUrls: ['./candidate-applied.component.scss']
})
export class CandidateAppliedComponent {

  API_URL = (environment.apiUrl);
  
  jobsApplied: any;
  id: any;

  constructor(
    private candidateService: CandidateService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.id = this.authService.currentUserValue._id;
    this.candidateService.getJobsApplied(this.id).subscribe(res => {
      this.jobsApplied = res.applied;
    })
  }

}
