import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DashboardData {
  totalIncidents: number;
  totalOpenIncidents: number;
  totalResolvedIncidents: number;
  totalEscalatedIncidents: number;
  totalInProgressIncidents: number;
  countByPriorityMap: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = "http://localhost:8082/v1/dashboard";

  constructor(private httpClient: HttpClient) { }

  getAdminDashboard(): Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(`${this.baseUrl}/admin`);
  }

  getUserDashboard(): Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(`${this.baseUrl}/user`);
  }
}
