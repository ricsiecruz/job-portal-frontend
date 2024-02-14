import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FindJobsComponent } from "./find-jobs/find-jobs.component";
import { HomeComponent } from "./home/home.component";
import { JobsByCategoryComponent } from "./jobs-by-category/jobs-by-category.component";
import { JobDetailsComponent } from "./job-details/job-details.component";
import { EmployerAboutComponent } from "./employer-about/employer-about.component";
import { CandidatesComponent } from "./candidates/candidates.component";
import { CandidateProfileComponent } from "./candidate-profile/candidate-profile.component";

const routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'find-jobs', component: FindJobsComponent },
    { path: 'jobs-by-category/:category', component: JobsByCategoryComponent },
    { path: 'job-post/details/:id/jobId/:jobId', component: JobDetailsComponent },
    { path: 'employer-about/:id', component: EmployerAboutComponent },
    { path: 'candidates', component: CandidatesComponent },
    { path: 'candidate-profile/:id', component: CandidateProfileComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LandingRoutingModule {}