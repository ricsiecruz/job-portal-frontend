import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LandingService } from 'src/app/components/landing/landing.service';
import { EmployerService } from '../employer.service';
// import { resolve } from 'node:path/win32';
import { environment } from 'src/environment';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-employer-job-applicants-list',
  templateUrl: './employer-job-applicants-list.component.html',
  styleUrls: ['./employer-job-applicants-list.component.scss']
})
export class EmployerJobApplicantsListComponent {

  API_URL = (environment.apiUrl);
  
  applicantsSub?: Subscription;
  applicantsLoadingSubscription?: Subscription;
  applicants: any;
  isListLoading?: boolean;

  id: any;
  userInfo: any;
  userSubscription?: Subscription;
  designation: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private landingService: LandingService,
    private route: ActivatedRoute
  ) {
    this.userSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.userInfo = user['user'];
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.landingService.getJobPost(this.userInfo._id, this.id).subscribe(res => {
      this.designation = res.job_details.designation;
    })
    this.landingService.getApplicants(this.userInfo._id, this.id);
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.applicantsSub = this.landingService.$applicants.subscribe(val => {
      this.applicants = val;
    })

    this.applicantsLoadingSubscription = this.landingService.$isApplicantsLoading.subscribe(val => {
        this.isListLoading = val;
    })

  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

}
