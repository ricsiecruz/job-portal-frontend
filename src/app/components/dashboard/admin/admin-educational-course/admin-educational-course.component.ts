import { Component } from '@angular/core';
import { Course } from 'src/app/models/category';
import { AdminAddEducationalCourseComponent } from '../admin-add-educational-course/admin-add-educational-course.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-educational-course',
  templateUrl: './admin-educational-course.component.html',
  styleUrls: ['./admin-educational-course.component.scss']
})
export class AdminEducationalCourseComponent {
  courseSubscription?: Subscription;
  courseLoadingSubscription?: Subscription;
  courses: Course[] = []
  isListLoading?: boolean;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {
    this.adminService.getCourses();
  }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.courseSubscription = this.adminService.$course.subscribe(val => {
        this.courses = val;
        console.log('course', this.courses)
    })

    this.courseLoadingSubscription = this.adminService.$isCategoryLoading.subscribe(val => {
        this.isListLoading = val;
    })

}

  ngOnDestroy() {
    this.courseSubscription?.unsubscribe();
    this.courseLoadingSubscription?.unsubscribe();
  }

  add() {
    this.modalService.open(AdminAddEducationalCourseComponent)
  }
}
