import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../component/dashboard-layout/dashboard-layout.component';

const routes: Routes = [{
  path: '',
  component: DashboardLayoutComponent,
  children: [
    {
      path: '',
      loadComponent: () => import('../component/common-dashboard-card/common-dashboard-card.component').then(m => m.CommonDashboardCardComponent)
    },
    {
      path: 'dashboard',
      loadComponent: () =>
        import('../component/common-dashboard-card/common-dashboard-card.component').then(m => m.CommonDashboardCardComponent)
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
