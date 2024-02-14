import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { AdminAddCategoryComponent } from '../admin-add-category/admin-add-category.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent {

  categoriesSubscription?: Subscription;
  categoriesLoadingSubscription?: Subscription;
  categories: Category[] = []
  isListLoading?: boolean;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {
    this.adminService.getCategories();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.categoriesSubscription = this.adminService.$categories.subscribe(val => {
        this.categories = val;
    })

    this.categoriesLoadingSubscription = this.adminService.$isCategoryLoading.subscribe(val => {
        this.isListLoading = val;
    })

}

  ngOnDestroy() {
    this.categoriesSubscription?.unsubscribe();
    this.categoriesLoadingSubscription?.unsubscribe();
  }

  add() {
    this.modalService.open(AdminAddCategoryComponent)
  }
}
