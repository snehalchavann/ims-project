import { CommonModule } from '@angular/common';
import { Component, Inject, Input, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Incident, IncidentService } from '../../services/incident.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.scss'
})
export class CreateIncidentComponent {

  mode: 'create' | 'update' = 'create';
  incident?: Incident;
  incidentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'update', incident?: Incident },
    @Optional() public dialogRef?: MatDialogRef<CreateIncidentComponent>
  ) { }

  ngOnInit() {
    this.incident = this.data?.incident;
    this.mode = this.data?.mode || 'create';
    this.incidentForm = this.fb.group({
      title: [this.incident?.title, Validators.required],
      description: [this.incident?.description, Validators.required],
      priority: [this.incident?.priority, Validators.required],
      status: [this.incident?.status || 'OPEN']
    });

    if (this.mode === 'update') {
      this.incidentForm.get('title')?.disable();
      this.incidentForm.get('description')?.disable();
      this.incidentForm.get('priority')?.disable();
    }
  }

  onSubmit() {
    if (this.incidentForm.valid) {
      console.log("Mode:" + this.mode);
      if (this.mode == 'create') {
        this.incidentService.createIncident(this.incidentForm.value).subscribe({
          next: () => {
            alert('Incident submitted successfully!');
            this.incidentForm.reset();
          },
          error: () => {
            alert('Error creating incident');
          }
        });
      } else if (this.mode === 'update' && this.incident) {
        const status = this.incidentForm.get('status')?.value;
        this.incidentService.updateStatus(this.incident.id, status).subscribe({
          next: (response) => {
            alert(`Incident id ${this.incident?.id} status updated to ${response.status}`);
          },
          error: () => {
            alert('Failed to update the incident');
          }
        })
        this.onClose();
      }
    }
  }

  onClose() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
