import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../component/dashboard-layout/dashboard-layout.component';

const routes: Routes = [{
  path: '',
  component: DashboardLayoutComponent,
  children: [
    {
      path: '',
      loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    }
    /*{
      path: 'create',
      component: CreateIncidentComponent
    },
    {
      path: 'incidents',
      component: ViewIncidentsComponent
    },*/
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
