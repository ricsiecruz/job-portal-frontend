import { Component } from '@angular/core';
import { LandingService } from '../landing.service';
import { EmployerService } from '../../dashboard/employer/employer.service';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users';
import { environment } from 'src/environment';
import { AdminService } from '../../dashboard/admin/admin.service';
import { Position, Setup } from 'src/app/models/category';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.scss']
})
export class FindJobsComponent {
  
  API_URL = (environment.apiUrl);

  jobsSubscription?: Subscription;
  jobsLoadingSubscription?: Subscription;
  jobSearchSubscription?: Subscription;
  jobSearchLoadingSubscription?: Subscription;
  setup: Setup[] = [];
  jobs: Users[] = [];
  positions: Position[] = [];
  isListLoading?: boolean;

  designation!: string;
  employerLocation!: string;
  category!: string;
  position!: string;
  setupFilter!: string;

  logo: any;

  constructor(
    private landingService: LandingService,
    private adminService: AdminService
  ) {
    this.landingService.getJobs();
    this.adminService.getPositions();
    this.adminService.getSetup();
  }

  ngOnInit() {

    this.setSubscriptions();

  }

  setSubscriptions() {
    console.log('find jobs', this.position)
    this.landingService.getJobsFiltered(this.designation, this.employerLocation, this.category, this.position, this.setupFilter);

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

  onFilterChanged(filter: any) {
    console.log('find jobs filter', filter)
    this.designation = filter.designation;
    this.employerLocation = filter.location;
    this.position = filter.position;
    this.setupFilter = filter.setup;
    this.setSubscriptions()
  }

  clearFilters() {
    this.designation = '';
    this.employerLocation = '';
    this.position = '';
    this.setupFilter = '';
    this.setSubscriptions()
  }

  ngOnDestroy() {
    this.jobsSubscription?.unsubscribe();
    this.jobsLoadingSubscription?.unsubscribe();
  }

}
