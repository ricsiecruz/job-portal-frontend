import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-add-rate',
  templateUrl: './admin-add-rate.component.html',
  styleUrls: ['./admin-add-rate.component.scss']
})
export class AdminAddRateComponent {
  rate?: string;

  constructor(
    private adminService: AdminService
  ) {}

  onSubmit(data: any) {

    const payload = {
      rate: data.rate
    }

    this.adminService.postRate(payload).subscribe(
      (data) => {
        // this.userData = JSON.stringify(data);
        console.log('register success', data)
        this.adminService.getRate()
      }
    )
  }
}
