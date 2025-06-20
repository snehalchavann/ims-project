import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  username = localStorage.getItem('username') || 'Guest';
  role = localStorage.getItem('role') || 'USER';

  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
