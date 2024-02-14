import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EmployerJobPostsComponent } from "./employer-job-posts/employer-job-posts.component";
import { EmployerMainComponent } from "./employer-main/employer-main.component";
import { EmployerSidebarComponent } from "./employer-sidebar/employer-sidebar.component";
import { EmployerRoutingModule } from "./employer.routing.module";
import { EmployerAddJobPostComponent } from "./employer-add-job-post/employer-add-job-post.component";
import { EmployerProfileComponent } from "./employer-profile/employer-profile.component";
import { EmployerJobPostsDetailsComponent } from "./employer-job-posts-details/employer-job-posts-details.component";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { EmployerJobApplicantsComponent } from "./employer-job-applicants/employer-job-applicants.component";
import { EmployerJobApplicantsListComponent } from "./employer-job-applicants-list/employer-job-applicants-list.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
    declarations: [
        EmployerMainComponent,
        EmployerSidebarComponent,
        EmployerProfileComponent,
        EmployerJobPostsComponent,
        EmployerJobPostsDetailsComponent,
        EmployerAddJobPostComponent,
        EmployerJobApplicantsComponent,
        EmployerJobApplicantsListComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        AngularMultiSelectModule,
        CKEditorModule,
        EmployerRoutingModule
    ]
})

export class EmployerModule {}