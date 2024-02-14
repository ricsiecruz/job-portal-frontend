import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Position } from 'src/app/models/category';
import { AdminAddPositionComponent } from '../admin-add-position/admin-add-position.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-positions',
  templateUrl: './admin-positions.component.html',
  styleUrls: ['./admin-positions.component.scss']
})
export class AdminPositionsComponent {
  positionsSubscription?: Subscription;
  positionsLoadingSubscription?: Subscription;
  positions: Position[] = []
  isListLoading?: boolean;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {
    this.adminService.getPositions();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.positionsSubscription = this.adminService.$positions.subscribe(val => {
        this.positions = val;
    })

    this.positionsLoadingSubscription = this.adminService.$isPositionLoading.subscribe(val => {
        this.isListLoading = val;
    })

}

  ngOnDestroy() {
    this.positionsSubscription?.unsubscribe();
    this.positionsLoadingSubscription?.unsubscribe();
  }

  add() {
    this.modalService.open(AdminAddPositionComponent)
  }
}
