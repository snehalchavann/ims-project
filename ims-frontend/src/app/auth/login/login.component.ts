import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthRequest } from '../../models/auth-request';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const loginData: AuthRequest = {
        username: this.form.value.username,
        password: this.form.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token!);
          const role = this.authService.getRole();
          console.log("role", role);
          if (role == 'ADMIN') {
            this.router.navigate(['/admin'])
          } else {
            console.log("in user");
            this.router.navigate(['/user']).then(success => {
              console.log('➡️ Navigation success:', success);
            }).catch(err => {
              console.error('navigation error:', err);
            });

          }
        },
        error: () => alert('Invalid username or password.')
      });
    }
  }

}
