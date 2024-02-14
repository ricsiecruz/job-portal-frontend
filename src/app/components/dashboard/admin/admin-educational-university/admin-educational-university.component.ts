import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { University } from 'src/app/models/category';
import { AdminService } from '../admin.service';
import { AdminAddEducationalUniversityComponent } from '../admin-add-educational-university/admin-add-educational-university.component';

@Component({
  selector: 'app-admin-educational-university',
  templateUrl: './admin-educational-university.component.html',
  styleUrls: ['./admin-educational-university.component.scss']
})
export class AdminEducationalUniversityComponent {
  univSubscription?: Subscription;
  univLoadingSubscription?: Subscription;
  university: University[] = []
  isListLoading?: boolean;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {
    this.adminService.getUniversities();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.univSubscription = this.adminService.$university.subscribe(val => {
        this.university = val;
    })

    this.univLoadingSubscription = this.adminService.$isCategoryLoading.subscribe(val => {
        this.isListLoading = val;
    })

}

  ngOnDestroy() {
    this.univSubscription?.unsubscribe();
    this.univLoadingSubscription?.unsubscribe();
  }

  add() {
    this.modalService.open(AdminAddEducationalUniversityComponent)
  }
}
