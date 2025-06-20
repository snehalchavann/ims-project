import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-view-incidents',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './view-incidents.component.html',
  styleUrl: './view-incidents.component.scss'
})
export class ViewIncidentsComponent {
  columns: string[] = ['title', 'priority', 'status'];
  incidents = [
    { title: 'Database outage', priority: 'High', status: 'Open' },
    { title: 'Login bug', priority: 'Medium', status: 'Resolved' },
    { title: 'Email delay', priority: 'Low', status: 'Investigating' }
  ];

}
