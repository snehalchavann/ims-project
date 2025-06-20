import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../component/dashboard-layout/dashboard-layout.component';
import { CreateIncidentComponent } from '../component/create-incident/create-incident.component';
import { ViewIncidentsComponent } from '../component/view-incidents/view-incidents.component';

const routes: Routes = [{
  path: '',
  component: DashboardLayoutComponent,
  children: [
    {
      path: '',
      loadComponent: () => import('./user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent),
    },
    {
      path: 'create',
      loadComponent: () =>
        import('../component/create-incident/create-incident.component').then(m => m.CreateIncidentComponent)
    },
    {
      path: 'incidents',
      loadComponent: () =>
        import('../component/view-incidents/view-incidents.component').then(m => m.ViewIncidentsComponent)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
