import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-add-educational-course',
  templateUrl: './admin-add-educational-course.component.html',
  styleUrls: ['./admin-add-educational-course.component.scss']
})
export class AdminAddEducationalCourseComponent {
  course?: string;

  constructor(
    private adminService: AdminService
  ) {}

  onSubmit(data: any) {

    const payload = {
      course: data.course
    }

    this.adminService.postCourse(payload).subscribe(
      (data) => {
        // this.userData = JSON.stringify(data);
        console.log('register success', data)
        this.adminService.getCourses()
      }
    )
  }
}
