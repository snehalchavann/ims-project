import { Component } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-purge-incidents',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './purge-incidents.component.html',
  styleUrl: './purge-incidents.component.scss'
})
export class PurgeIncidentsComponent {
  constructor(private incidentService: IncidentService,
    private snackBar: MatSnackBar
  ) { }

  onPurge(): void {
    if (confirm('Are you sure you want to permanently delete all resolved incidents?')) {
      this.incidentService.purgeIncident().subscribe({
        next: (response) => {
          this.snackBar.open(response, 'Close', { duration: 3000, panelClass: 'success-snackbar' });
        },
        error: () => {
          this.snackBar.open('Failed to purge incidents.', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
        }
      });
    }
  }
}
