import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.scss'
})
export class CreateIncidentComponent {
  incidentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.incidentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.incidentForm.valid) {
      const formValues = this.incidentForm.value;
      console.log('Incident created:', formValues);
      //call to post method
      //check if call is ok then give success alert
      alert('Incident submitted successfully!');
      this.incidentForm.reset();
    }
  }
}
