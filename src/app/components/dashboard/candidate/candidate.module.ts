import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CandidateRoutingModule } from "./candidate.routing.module";
import { CandidateMainComponent } from "./candidate-main/candidate-main.component";
import { CandidateProfileComponent } from "./candidate-profile/candidate-profile.component";
import { CandidateSidebarComponent } from "./candidate-sidebar/candidate-sidebar.component";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { CandidateAppliedComponent } from "./candidate-applied/candidate-applied.component";
import { CandidateInvitesComponent } from "./candidate-invites/candidate-invites.component";

@NgModule({
    declarations: [
        CandidateMainComponent,
        CandidateSidebarComponent,
        CandidateProfileComponent,
        CandidateAppliedComponent,
        CandidateInvitesComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        AngularMultiSelectModule,
        CandidateRoutingModule
    ]
})

export class CandidateModule {}