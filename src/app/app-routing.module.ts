import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./components/landing/landing.module").then((m) => m.LandingModule)
  },
  {
    path: 'candidate',
    loadChildren: () => import("./components/dashboard/candidate/candidate.module").then((m) => m.CandidateModule)
  },
  {
    path: 'employer',
    loadChildren: () => import("./components/dashboard/employer/employer.module").then((m) => m.EmployerModule)
  },
  {
    path: 'admin',
    loadChildren: () => import("./components/dashboard/admin/admin.module").then((m) => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
