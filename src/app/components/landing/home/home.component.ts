import { Component } from '@angular/core';
import { LandingService } from '../landing.service';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users';
import { environment } from 'src/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  API_URL = (environment.apiUrl);
  
  jobsSubscription?: Subscription;
  jobsLoadingSubscription?: Subscription;
  jobsCategoryCountSubscription?: Subscription;
  jobs: Users[] = [];
  jobsCategoryCount: any;

  constructor(
    private landingService: LandingService
  ) {
    this.landingService.getJobs();
    this.landingService.getJobsCategoryCount();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.jobsSubscription = this.landingService.$jobs.subscribe(val => {
      this.jobs = val;
      console.log('home val', this.jobs)

    })

    this.jobsCategoryCountSubscription = this.landingService.$jobsCategoryCount.subscribe(val => {
      this.jobsCategoryCount = val;
    })
  }

}
