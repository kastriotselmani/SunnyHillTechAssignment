import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DashboardMetrics {
  totalProducts: number;
  activeUsers: number;
  totalSales: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() { }

  getMetrics(): Observable<DashboardMetrics> {
    const dummyMetrics: DashboardMetrics = {
      totalProducts: 150,
      activeUsers: 45,
      totalSales: 12345.67
    };
    return of(dummyMetrics);
  }
}
