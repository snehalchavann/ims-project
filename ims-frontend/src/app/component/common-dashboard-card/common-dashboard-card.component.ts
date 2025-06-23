import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardData, DashboardService } from '../../services/dashboard.service';
import { IncidentService } from '../../services/incident.service';
import { AuthService } from '../../services/auth.service';
import { NotifyUpdateService } from '../../services/notify-update.service';

@Component({
  selector: 'app-common-dashboard-card',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    MatCardModule,
    MatTableModule,
    CommonDashboardCardComponent,
    NgChartsModule,
    MatCard,
    MatGridListModule,
    NgChartsModule],
  templateUrl: './common-dashboard-card.component.html',
  styleUrl: './common-dashboard-card.component.scss'
})
export class CommonDashboardCardComponent {
  dashboardData: DashboardData | null = null;
  columnsForDashboard: string[] = ['title', 'status', 'priority', 'date'];

  latestIncidents: any[] = [];
  statusChartData: any;
  priorityChartData: any;

  statusChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  priorityChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
  isAdmin?: boolean;

  constructor(private dashboardService: DashboardService,
    private authService: AuthService,
    private incidentService: IncidentService,
    private notifyUpdateService: NotifyUpdateService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadDashboardData();

    this.notifyUpdateService.update$.subscribe(() => {
      this.loadDashboardData();
    })
  }

  private loadDashboardData(): void {
    if (this.isAdmin) {
      this.dashboardService.getAdminDashboard().subscribe({
        next: (data) => this.setDataForDashboard(data),
        error: (error) => console.log("Error in getting Admin dashboard data", error)
      });
    } else {
      this.dashboardService.getUserDashboard().subscribe({
        next: (data) => this.setDataForDashboard(data),
        error: (error) => console.log("Error in getting Admin dashboard data", error)
      });
    }

    this.incidentService.getRecentIncidents().subscribe({
      next: (data) => this.latestIncidents = data,
      error: () => console.error('Error getting latest incidents')
    });
  }

  private setDataForDashboard(data: DashboardData): void {
    this.dashboardData = data;
    this.statusChartData = {
      labels: ['Open', 'In-Progress', 'Escalated', 'Resolved'],
      datasets: [{
        label: 'Count',
        data: [
          data.totalOpenIncidents,
          data.totalInProgressIncidents,
          data.totalEscalatedIncidents,
          data.totalResolvedIncidents
        ],
        backgroundColor: ['#4285F4', '#FBBC05', '#EA4335', '#34A853']
      }]
    };

    this.priorityChartData = {
      labels: Object.keys(data.countByPriorityMap || {}),
      datasets: [{
        data: Object.values(data.countByPriorityMap || {}),
        backgroundColor: ['#0F52BA', '#87CEEB', '#4682B4']
      }]
    };
  }
}
