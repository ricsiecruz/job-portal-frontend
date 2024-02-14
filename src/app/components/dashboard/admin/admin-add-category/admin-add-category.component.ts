import { Component } from '@angular/core';
import { LandingService } from 'src/app/components/landing/landing.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.scss']
})
export class AdminAddCategoryComponent {

  category?: string;

  constructor(
    private adminService: AdminService
  ) {}

  onSubmit(data: any) {

    const payload = {
      category: data.category
    }

    this.adminService.postCategory(payload).subscribe(
      (data) => {
        // this.userData = JSON.stringify(data);
        console.log('register success', data)
        this.adminService.getCategories()
      }
    )
  }
}
