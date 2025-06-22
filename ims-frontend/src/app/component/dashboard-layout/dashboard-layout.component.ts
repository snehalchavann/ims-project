import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  username: string = 'Guest';
  role: string = 'USER';

  constructor(private router: Router, private authService: AuthService) {
    this.role = this.authService.getRole();
    this.username = this.authService.getUserName();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
