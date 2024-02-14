import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environment';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {

  API_URL = (environment.apiUrl);
  @Input() job: any;

  logo: any;
  id: string = '';
  jobId: string = '';

  constructor(
    private route: ActivatedRoute,
    private landingService: LandingService
  ) {
    this.route.paramMap.subscribe((param: any) => {
      console.log('param', param)
  })
  }

  ngOnInit() {
    this.logo = this.API_URL + this.job.role.data.employerInfo.logo;
  }

  view() {
    this.id = this.job._id;
    this.jobId = this.job.role.data.job_posts._jobId;

    this.landingService.getJobPost(this.id, this.jobId)
  }
}
