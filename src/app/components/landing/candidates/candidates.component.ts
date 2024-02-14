import { Component } from '@angular/core';
import { LandingService } from '../landing.service';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {

  usersSubscription?: Subscription;
  usersLoadingSubscription?: Subscription;
  isListLoading?: boolean;
  users: Users[] = [];
  role: any;
  skills!: string;
  selectedSkills!: string;

  constructor(private landingService: LandingService) {
    this.landingService.getUsers()
  }

  ngOnInit() {
    this.setSubscriptions()
  }

  setSubscriptions() {
    console.log('cadidates selected skills', this.selectedSkills)
    this.landingService.getCandidatesFiltered(this.selectedSkills);

    this.usersSubscription = this.landingService.$users.subscribe(val => {
      this.users = val
      this.role = this.users.filter(item => item.role?.role === 'candidate')
    })

    this.usersLoadingSubscription = this.landingService.$isUsersLoading.subscribe(val => {
        this.isListLoading = val;
    })
  }

  onFilterChanged(filter: any) {
    console.log('candidates filter', filter, filter.selectedSkills, filter.skills)
    this.selectedSkills = filter;
    this.setSubscriptions()
  }

  clearFilters() {
    this.selectedSkills = ''
    this.setSubscriptions()
  }

  ngOnDestroy() {
    this.usersSubscription?.unsubscribe();
    this.usersLoadingSubscription?.unsubscribe();
  }

}
