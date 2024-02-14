import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-add-educational-university',
  templateUrl: './admin-add-educational-university.component.html',
  styleUrls: ['./admin-add-educational-university.component.scss']
})
export class AdminAddEducationalUniversityComponent {
  university?: string;

  constructor(
    private adminService: AdminService
  ) {}

  onSubmit(data: any) {

    const payload = {
      university: data.university
    }

    this.adminService.postUniversity(payload).subscribe(
      (data) => {
        // this.userData = JSON.stringify(data);
        console.log('register success', data)
        this.adminService.getUniversities()
      }
    )
  }
}
