import { Component } from '@angular/core';
import { EmployerService } from '../employer.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { Users } from 'src/app/models/users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employer-job-posts',
  templateUrl: './employer-job-posts.component.html',
  styleUrls: ['./employer-job-posts.component.scss']
})

export class EmployerJobPostsComponent {

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
      })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }

  view(id: any, jobPost: any) {

    var jobDetails = jobPost;

    var toStringJobDetails = JSON.stringify(jobDetails)

    toStringJobDetails;

    localStorage.setItem('selectedJobPost', toStringJobDetails)

    var retrieveJobPost = localStorage.getItem('selectedJobPost') || 'null';

    retrieveJobPost;

    var jobPostDetails = JSON.parse(retrieveJobPost);

    jobPostDetails;
  }

}
