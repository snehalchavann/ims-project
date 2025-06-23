import { Component } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-purge-incidents',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './purge-incidents.component.html',
  styleUrl: './purge-incidents.component.scss'
})
export class PurgeIncidentsComponent {
  selectedOption: string = '30';
  customDays: number = 30;
  showCustomInput = false;

  constructor(private incidentService: IncidentService,
    private snackBar: MatSnackBar
  ) { }

  onOptionChange(value: string) {
    this.showCustomInput = value === 'CUSTOM';
  }

  onPurge(): void {
    if (confirm('Are you sure you want to permanently delete all resolved incidents?')) {
      let daysToPurge = 30;

      if (this.selectedOption === 'CUSTOM') {
        daysToPurge = this.customDays;
      } else if (this.selectedOption === 'ALL') {
        daysToPurge = 0;
      }
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
