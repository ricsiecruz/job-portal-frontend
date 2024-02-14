import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-add-setup',
  templateUrl: './admin-add-setup.component.html',
  styleUrls: ['./admin-add-setup.component.scss']
})
export class AdminAddSetupComponent {
  setup?: string;

  constructor(
    private adminService: AdminService
  ) {}

  onSubmit(data: any) {

    const payload = {
      setup: data.setup
    }

    this.adminService.postSetup(payload).subscribe(
      (data) => {
        // this.userData = JSON.stringify(data);
        console.log('register success', data)
        this.adminService.getSetup()
      }
    )
  }
}
