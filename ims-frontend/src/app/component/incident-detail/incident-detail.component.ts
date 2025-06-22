import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Incident } from '../../services/incident.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCard
  ],
  templateUrl: './incident-detail.component.html',
  styleUrl: './incident-detail.component.scss'
})
export class IncidentDetailComponent {
  constructor(
    public dialog: MatDialogRef<IncidentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Incident
  ) { }

  onClose() {
    if (this.dialog) {
      this.dialog.close();
    }
  }
}
