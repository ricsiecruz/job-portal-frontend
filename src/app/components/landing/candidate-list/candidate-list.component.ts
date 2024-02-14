import { Component, Input } from '@angular/core';
import { environment } from 'src/environment';
import { LandingService } from '../landing.service';
import { EmployerService } from '../../dashboard/employer/employer.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent {

  API_URL = (environment.apiUrl);
  @Input() user: any;

  image: any;
  skill: any;
  skillList = [
    { itemName: '' }
  ]

  constructor(
    private employerService: EmployerService
  ) {}

  ngOnInit() {

    this.image = this.API_URL + this.user.role.data.candidateInfo.image;

    this.user.role.data.candidateInfo.skills.filter((item: any) => {
      this.skill = item.itemName
      this.skillList.push({ itemName: this.skill })
    })

  }

  view() {
    this.employerService.getUserInfo(this.user._id)
  }
  
}
