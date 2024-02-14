import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { AdminPositionsComponent } from "./admin-positions/admin-positions.component";
import { AdminSetupComponent } from "./admin-setup/admin-setup.component";
import { AdminRateComponent } from "./admin-rate/admin-rate.component";
import { AdminSkillsComponent } from "./admin-skills/admin-skills.component";
import { AdminEducationalDegreeComponent } from "./admin-educational-degree/admin-educational-degree.component";
import { AdminEducationalCourseComponent } from "./admin-educational-course/admin-educational-course.component";
import { AdminEducationalUniversityComponent } from "./admin-educational-university/admin-educational-university.component";

type PathMatch = "full" | "prefix" | undefined;

const routes = [
    { path: 'dashboard', component: AdminMainComponent,
        children: [ 
            { path: 'categories', component: AdminCategoriesComponent },
            { path: 'positions', component: AdminPositionsComponent },
            { path: 'setup', component: AdminSetupComponent },
            { path: 'rate', component: AdminRateComponent },
            { path: 'skills', component: AdminSkillsComponent },
            { path: 'degree', component: AdminEducationalDegreeComponent },
            { path: 'course', component: AdminEducationalCourseComponent },
            { path: 'universities', component: AdminEducationalUniversityComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}