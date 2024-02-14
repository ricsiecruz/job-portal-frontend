import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { LandingRoutingModule } from "./landing.routing.module";
import { FindJobsComponent } from "./find-jobs/find-jobs.component";
import { HomeComponent } from "./home/home.component";
import { SortByPipe } from "./sort-by.pipe";
import { JobsByCategoryComponent } from "./jobs-by-category/jobs-by-category.component";
import { SearchFilterComponent } from "./search-filter/search-filter.component";
import { FilterComponent } from "./filter/filter.component";
import { JobListComponent } from "./job-list/job-list.component";
import { JobDetailsComponent } from "./job-details/job-details.component";
import { RegisterComponent } from "./register/register.component";
import { EmployerAboutComponent } from "./employer-about/employer-about.component";
import { CandidatesComponent } from "./candidates/candidates.component";
import { CandidateListComponent } from "./candidate-list/candidate-list.component";
import { CandidateProfileComponent } from "./candidate-profile/candidate-profile.component";
import { CandidateSearchComponent } from "./candidate-search/candidate-search.component";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        FindJobsComponent,
        HomeComponent,
        JobsByCategoryComponent,
        SearchFilterComponent,
        JobListComponent,
        JobDetailsComponent,
        EmployerAboutComponent,
        CandidatesComponent,
        CandidateListComponent,
        CandidateProfileComponent,
        CandidateSearchComponent,
        SortByPipe,
        FilterComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        AngularMultiSelectModule,
        CKEditorModule,
        LandingRoutingModule
    ]
})

export class LandingModule {}