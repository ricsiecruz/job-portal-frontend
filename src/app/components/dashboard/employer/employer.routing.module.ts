import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployerJobPostsComponent } from "./employer-job-posts/employer-job-posts.component";
import { EmployerMainComponent } from "./employer-main/employer-main.component";
import { EmployerAddJobPostComponent } from "./employer-add-job-post/employer-add-job-post.component";
import { EmployerProfileComponent } from "./employer-profile/employer-profile.component";
import { EmployerJobPostsDetailsComponent } from "./employer-job-posts-details/employer-job-posts-details.component";
import { EmployerJobApplicantsComponent } from "./employer-job-applicants/employer-job-applicants.component";
import { EmployerJobApplicantsListComponent } from "./employer-job-applicants-list/employer-job-applicants-list.component";

const routes = [
    { path: 'dashboard', component: EmployerMainComponent,
        children: [ 
            { path: 'profile', component: EmployerProfileComponent },
            { path: 'job-posts', component: EmployerJobPostsComponent },
            { path: 'job-posts/details/:id', component: EmployerJobPostsDetailsComponent },
            { path: 'add-job-post', component: EmployerAddJobPostComponent },
            { path: 'job-applicants', component: EmployerJobApplicantsComponent },
            { path: 'job-applicants/list/:id', component: EmployerJobApplicantsListComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmployerRoutingModule {}