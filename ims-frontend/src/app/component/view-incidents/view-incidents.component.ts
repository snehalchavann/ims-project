import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Incident, IncidentService } from '../../services/incident.service';
import { AuthService } from '../../services/auth.service';
import { CreateIncidentComponent } from '../create-incident/create-incident.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { IncidentDetailComponent } from '../incident-detail/incident-detail.component';

@Component({
  selector: 'app-view-incidents',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormField,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './view-incidents.component.html',
  styleUrl: './view-incidents.component.scss'
})
export class ViewIncidentsComponent {
  incidents: Incident[] = [];
  filteredIncidents: any[] = [];
  isAdmin: boolean = false;
  columns: string[] = ['id', 'title', 'priority', 'status', 'Date', 'actions'];
  expandedIncident: any | null = null;
  constructor(private incidentService: IncidentService, private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidentService.getAllIncidents().subscribe({
      next: data => {
        this.incidents = data;
        this.filteredIncidents = [...this.incidents];
      },
      error: () => alert('Error loading the incidents')
    });
  }

  openUpdateDialog(incident: Incident): void {
    const updateDialog = this.dialog.open(CreateIncidentComponent, {
      data: {
        mode: 'update',
        incident: incident
      }
    });
  }

  openDetailsDialog(incident: Incident): void {
    this.dialog.open(IncidentDetailComponent, {
      width: '500px',
      data: incident
    });
  }

  filter = {
    priority: '',
    status: '',
    date: ''
  };

  applyFilters(): void {
    this.filteredIncidents = this.incidents.filter(incident => {
      const matchPriority = this.filter.priority ? incident.priority === this.filter.priority : true;
      const matchStatus = this.filter.status ? incident.status === this.filter.status : true;
      const matchDate = this.filter.date ? new Date(incident.createdAt).toDateString() === new Date(this.filter.date).toDateString() : true;
      return matchPriority && matchStatus && matchDate;
    });
  }
}
