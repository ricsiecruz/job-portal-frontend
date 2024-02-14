import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { environment } from 'src/environment';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-invites',
  templateUrl: './candidate-invites.component.html',
  styleUrls: ['./candidate-invites.component.scss']
})
export class CandidateInvitesComponent {
  API_URL = (environment.apiUrl);
  
  jobInvites: any;
  id: any;

  constructor(
    private candidateService: CandidateService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.id = this.authService.currentUserValue._id;
    this.candidateService.getJobInvite(this.id).subscribe(res => {
      this.jobInvites = res.invite;
    })
  }
}
