import { Component } from '@angular/core';
import { AdminAddRateComponent } from '../admin-add-rate/admin-add-rate.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { Rate } from 'src/app/models/category';

@Component({
  selector: 'app-admin-rate',
  templateUrl: './admin-rate.component.html',
  styleUrls: ['./admin-rate.component.scss']
})
export class AdminRateComponent {
  rateSubscription?: Subscription;
  rateLoadingSubscription?: Subscription;
  rate: Rate[] = []
  isListLoading?: boolean;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {
    this.adminService.getRate();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.rateSubscription = this.adminService.$rate.subscribe(val => {
        this.rate = val;
    })

    this.rateLoadingSubscription = this.adminService.$isRateLoading.subscribe(val => {
        this.isListLoading = val;
    })
  }

  ngOnDestroy() {
    this.rateSubscription?.unsubscribe();
    this.rateLoadingSubscription?.unsubscribe();
  }

  add() {
    this.modalService.open(AdminAddRateComponent)
  }
}
