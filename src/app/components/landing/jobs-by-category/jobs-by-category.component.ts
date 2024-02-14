import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingService } from '../landing.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environment';
import { AdminService } from '../../dashboard/admin/admin.service';

@Component({
  selector: 'app-jobs-by-category',
  templateUrl: './jobs-by-category.component.html',
  styleUrls: ['./jobs-by-category.component.scss']
})
export class JobsByCategoryComponent {

  API_URL = (environment.apiUrl)

  jobsSubscription?: Subscription;
  jobsLoadingSubscription?: Subscription;

  category: string = '';
  jobs: any;
  jobList: any = [{ name: 'Jobs', series: [] }];
  jobData: any;
  
  designation!: string;
  employerLocation!: string;
  position!: string;
  setupFilter!: string;
  logo: any;

  constructor(
    private landingService: LandingService,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((param: any) => {
      this.category = param.params.category
    })

    this.landingService.getJobsByCategory(this.category)
    
    this.adminService.getPositions();
    this.adminService.getSetup();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    console.log('category', this.category)
    this.landingService.getJobsFiltered(this.designation, this.employerLocation, this.category, this.position, this.setupFilter);
    this.jobsSubscription = this.landingService.$jobsByCategory.subscribe(val => {
      this.jobs = val;
      console.log('find job posts val', val)
      this.jobs.filter((data: any) => {
        this.logo = this.API_URL + data.role.data.employerInfo.logo;
      })
    })
  }

  clearFilters() {
    this.designation = '';
    this.employerLocation = '';
    this.position = '';
    this.setupFilter = '';
    this.setSubscriptions()
  }

  onFilterChanged(filter: any) {
    console.log('filter', filter)
    this.designation = filter.designation;
    this.employerLocation = filter.employerLocation;
    this.position = filter.position;
    this.setupFilter = filter.setup;
    this.setSubscriptions()
  }

}
