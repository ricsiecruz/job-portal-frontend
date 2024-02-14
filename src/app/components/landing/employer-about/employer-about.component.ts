import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { JobPosts } from 'src/app/models/roles';
import { environment } from 'src/environment';
import { EmployerService } from '../../dashboard/employer/employer.service';
import { Users } from 'src/app/models/users';
import { ActivatedRoute } from '@angular/router';
import { LandingService } from '../landing.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-employer-about',
  templateUrl: './employer-about.component.html',
  styleUrls: ['./employer-about.component.scss']
})
export class EmployerAboutComponent {
  API_URL = (environment.apiUrl);

  jobsSubscription?: Subscription;
  jobsLoadingSubscription?: Subscription;
  jobs: Users[] = [];
  isListLoading?: boolean;

  jobPosts: any;
  count?: number;

  id: any;
  employer: any;
  logo: any;

  editor = ClassicEditor;
  editorConfig = {
    toolbar: [],
    readonly: true,
    editor: {
      isReadOnly: true,
      isDisabled: true
    }
  }

  constructor(
    private route: ActivatedRoute,
    private landingService: LandingService,
    private employerService: EmployerService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.employerService.getUserInfo(this.id).subscribe(res => {
      this.employer = res;
      this.jobPosts = res.role?.data?.job_posts;
      this.count = this.jobPosts.length;
    })
    
    this.landingService.getJobs();
  }

  ngOnInit() {

    this.setSubscriptions();

  }

  setSubscriptions() {
    this.jobsSubscription = this.landingService.$jobs.subscribe(val => {
      this.jobs = val;

      this.jobs.filter((data: any) => {
        this.logo = this.API_URL + data.role.data.employerInfo.logo;
      })

    })

    this.jobsLoadingSubscription = this.landingService.$isJobsLoading.subscribe(val => {
        this.isListLoading = val;
    })

  }

}

