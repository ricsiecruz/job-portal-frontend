import { Component } from '@angular/core';
import { Skill } from 'src/app/models/category';
import { AdminAddSkillComponent } from '../admin-add-skill/admin-add-skill.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.scss']
})
export class AdminSkillsComponent {
  skillSubscription?: Subscription;
  skillLoadingSubscription?: Subscription;
  skills: Skill[] = []
  isListLoading?: boolean;
  skillList = [
    { itemName: '' }
  ]
  skillName: string = '';

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {
    this.adminService.getSkills();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.skillSubscription = this.adminService.$skills.subscribe(val => {
        this.skills = val;
    })

    this.skillLoadingSubscription = this.adminService.$isSkillsLoading.subscribe(val => {
        this.isListLoading = val;
    })

}

  ngOnDestroy() {
    this.skillSubscription?.unsubscribe();
    this.skillLoadingSubscription?.unsubscribe();
  }

  add() {
    this.modalService.open(AdminAddSkillComponent)
  }
}
