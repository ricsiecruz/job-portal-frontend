import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CandidateMainComponent } from "./candidate-main/candidate-main.component";
import { CandidateProfileComponent } from "./candidate-profile/candidate-profile.component";
import { CandidateAppliedComponent } from "./candidate-applied/candidate-applied.component";
import { CandidateInvitesComponent } from "./candidate-invites/candidate-invites.component";

const routes = [
    { path: 'dashboard', component: CandidateMainComponent,
        children: [ 
            { path: 'profile', component: CandidateProfileComponent },
            { path: 'applied', component: CandidateAppliedComponent },
            { path: 'invites', component: CandidateInvitesComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CandidateRoutingModule {}