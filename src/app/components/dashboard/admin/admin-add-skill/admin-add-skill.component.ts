import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-add-skill',
  templateUrl: './admin-add-skill.component.html',
  styleUrls: ['./admin-add-skill.component.scss']
})
export class AdminAddSkillComponent {
  skill?: string;

  constructor(
    private adminService: AdminService
  ) {}

  onSubmit(data: any) {

    const payload = {
      itemName: data.skill
    }

    this.adminService.postSkill(payload).subscribe(
      (data) => {
        // this.userData = JSON.stringify(data);
        console.log('register success', data)
        this.adminService.getSkills()
      }
    )
  }
}
