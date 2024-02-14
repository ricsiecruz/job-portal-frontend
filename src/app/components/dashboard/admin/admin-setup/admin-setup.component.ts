import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Setup } from 'src/app/models/category';
import { AdminAddSetupComponent } from '../admin-add-setup/admin-add-setup.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-setup',
  templateUrl: './admin-setup.component.html',
  styleUrls: ['./admin-setup.component.scss']
})
export class AdminSetupComponent {
  setupSubscription?: Subscription;
  setupLoadingSubscription?: Subscription;
  setup: Setup[] = []
  isListLoading?: boolean;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {
    this.adminService.getSetup();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.setupSubscription = this.adminService.$setup.subscribe(val => {
        this.setup = val;
    })

    this.setupLoadingSubscription = this.adminService.$isSetupLoading.subscribe(val => {
        this.isListLoading = val;
    })

}

  ngOnDestroy() {
    this.setupSubscription?.unsubscribe();
    this.setupLoadingSubscription?.unsubscribe();
  }

  add() {
    this.modalService.open(AdminAddSetupComponent)
  }
}
