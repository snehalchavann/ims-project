import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8082/v1/incidents';

export interface IncidentRequest {
  title: string;
  description: string;
  priority: string;
}

export interface Incident extends IncidentRequest {
  id: number;
  status: string;
  createdAt: string;
  createdBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(private http: HttpClient) { }

  createIncident(payload: IncidentRequest): Observable<any> {
    return this.http.post(`${API_URL}`, payload);
  }

  getAllIncidents(): Observable<any> {
    return this.http.get(`${API_URL}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    console.log("id:" + id);
    return this.http.put(`${API_URL}/${id}/status?status=${status}`, { responseType: 'text' });
  }

  purgeIncident(): Observable<any> {
    return this.http.delete(`${API_URL}/purge`, { responseType: 'text' });
  }

  getRecentIncidents(): Observable<any> {
    return this.http.get(`${API_URL}/recentIncidents`);
  }
}
