import { Component } from '@angular/core';
import { Degree } from 'src/app/models/category';
import { AdminAddEducationalDegreeComponent } from '../admin-add-educational-degree/admin-add-educational-degree.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-educational-degree',
  templateUrl: './admin-educational-degree.component.html',
  styleUrls: ['./admin-educational-degree.component.scss']
})
export class AdminEducationalDegreeComponent {
  degreeSubscription?: Subscription;
  degreeLoadingSubscription?: Subscription;
  degrees: Degree[] = []
  isListLoading?: boolean;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {
    this.adminService.getDegrees();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.degreeSubscription = this.adminService.$degree.subscribe(val => {
        this.degrees = val;
    })

    this.degreeLoadingSubscription = this.adminService.$isCategoryLoading.subscribe(val => {
        this.isListLoading = val;
    })

}

  ngOnDestroy() {
    this.degreeSubscription?.unsubscribe();
    this.degreeLoadingSubscription?.unsubscribe();
  }

  add() {
    this.modalService.open(AdminAddEducationalDegreeComponent)
  }
}
