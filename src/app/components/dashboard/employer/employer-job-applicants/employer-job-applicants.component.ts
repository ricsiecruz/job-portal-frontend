import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Users } from 'src/app/models/users';
import { EmployerService } from '../employer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employer-job-applicants',
  templateUrl: './employer-job-applicants.component.html',
  styleUrls: ['./employer-job-applicants.component.scss']
})
export class EmployerJobApplicantsComponent {

  user: any;
  jobPosts: any;
  data: any;
  id: any;
  userInfo: any;
  userSubscription?: Subscription;

  constructor(
    private employerService: EmployerService,
    private authService: AuthenticationService
  ) {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.userInfo = user['user'];
    })
  }

  async ngOnInit() {
    this.employerService.getUserInfo(this.userInfo._id)
      .subscribe(res => {
        this.user = res;
        this.jobPosts = res.role?.data?.job_posts;

        this.jobPosts.forEach((x: any) => {
          this.data = x;
        })
      })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
  
}
