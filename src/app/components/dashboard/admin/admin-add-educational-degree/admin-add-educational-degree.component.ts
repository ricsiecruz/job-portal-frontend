import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-add-educational-degree',
  templateUrl: './admin-add-educational-degree.component.html',
  styleUrls: ['./admin-add-educational-degree.component.scss']
})
export class AdminAddEducationalDegreeComponent {
  degree?: string;

  constructor(
    private adminService: AdminService
  ) {}

  onSubmit(data: any) {

    const payload = {
      degree: data.degree
    }

    this.adminService.postDegree(payload).subscribe(
      (data) => {
        // this.userData = JSON.stringify(data);
        console.log('register success', data)
        this.adminService.getDegrees()
      }
    )
  }
}
