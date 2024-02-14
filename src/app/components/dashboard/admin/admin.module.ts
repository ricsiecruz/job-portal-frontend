import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminAddCategoryComponent } from './admin-add-category/admin-add-category.component';
import { AdminPositionsComponent } from './admin-positions/admin-positions.component';
import { AdminAddPositionComponent } from './admin-add-position/admin-add-position.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';
import { AdminAddSetupComponent } from './admin-add-setup/admin-add-setup.component';
import { AdminRateComponent } from './admin-rate/admin-rate.component';
import { AdminAddRateComponent } from './admin-add-rate/admin-add-rate.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminAddSkillComponent } from './admin-add-skill/admin-add-skill.component';
import { AdminEducationalDegreeComponent } from './admin-educational-degree/admin-educational-degree.component';
import { AdminAddEducationalDegreeComponent } from './admin-add-educational-degree/admin-add-educational-degree.component';
import { AdminEducationalCourseComponent } from './admin-educational-course/admin-educational-course.component';
import { AdminAddEducationalCourseComponent } from './admin-add-educational-course/admin-add-educational-course.component';
import { AdminAddEducationalUniversityComponent } from './admin-add-educational-university/admin-add-educational-university.component';
import { AdminEducationalUniversityComponent } from './admin-educational-university/admin-educational-university.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    AdminSidebarComponent,
    AdminCategoriesComponent,
    AdminAddCategoryComponent,
    AdminPositionsComponent,
    AdminAddPositionComponent,
    AdminSetupComponent,
    AdminAddSetupComponent,
    AdminRateComponent,
    AdminAddRateComponent,
    AdminSkillsComponent,
    AdminAddSkillComponent,
    AdminEducationalDegreeComponent,
    AdminAddEducationalDegreeComponent,
    AdminEducationalCourseComponent,
    AdminAddEducationalCourseComponent,
    AdminEducationalUniversityComponent,
    AdminAddEducationalUniversityComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AdminRoutingModule
  ]
})

export class AdminModule { }
