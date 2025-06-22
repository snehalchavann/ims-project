import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
const authUrl = "http://localhost:8081/auth/v1"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${authUrl}/login`, request);
  }

  signup(request: any): Observable<any> {
    return this.http.post(`${authUrl}/signup`, request);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string {
    const token = this.getToken();
    if (!token) return 'Guest';

    const payload = token.split('.')[1];
    try {
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.sub || 'Guest';
    } catch (e) {
      console.error('Invalid token', e);
      return 'Guest';
    }
  }

  getRole(): string {
    const token = this.getToken();
    if (!token) return '';
    const data = JSON.parse(atob(token.split('.')[1]));
    return data.role;
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'ADMIN';
  }
}
