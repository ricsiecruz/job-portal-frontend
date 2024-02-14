import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-add-position',
  templateUrl: './admin-add-position.component.html',
  styleUrls: ['./admin-add-position.component.scss']
})
export class AdminAddPositionComponent {
  
  position?: string;

  constructor(
    private adminService: AdminService
  ) {}

  onSubmit(data: any) {

    const payload = {
      position: data.position
    }

    this.adminService.postPosition(payload).subscribe(
      (data) => {
        // this.userData = JSON.stringify(data);
        console.log('register success', data)
        this.adminService.getPositions()
      }
    )
  }
}
