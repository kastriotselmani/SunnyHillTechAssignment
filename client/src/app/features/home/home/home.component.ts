import { Component, OnInit } from '@angular/core';
import { DashboardMetrics, DashboardService } from '../../../services/dashboard.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  totalProducts: number = 0;
  activeUsers: number = 0;
  totalSales: number = 0;
  loading: boolean = true;
  errorMessage: string | null = null;
  productData: any[] = []; // Stores category-wise product count
  salesProgress: number = 0;

  constructor(private dashboardService: DashboardService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDashboardMetrics();
    this.fetchCategoryCounts();
  }

  fetchDashboardMetrics() {
    this.dashboardService.getMetrics().subscribe({
      next: (metrics: DashboardMetrics) => {
        this.totalProducts = metrics.totalProducts;
        this.activeUsers = metrics.activeUsers;
        this.totalSales = metrics.totalSales;
        this.salesProgress = (metrics.totalSales / 10000) * 100; // Example progress calculation
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching dashboard metrics:', error);
        this.errorMessage = 'Error loading dashboard data. Please try again later.';
        this.loading = false;
      }
    });
  }

  fetchCategoryCounts() {
    this.http.get<any[]>('/api/products/categories-count').subscribe({
      next: (data) => {
        this.productData = data.map(item => ({
          name: item.category,
          value: item.count
        }));
      },
      error: (error) => {
        console.error('Error fetching category data:', error);
      }
    });
  }

  getWelcomeMessage(): string {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const userName = user?.name || 'User';
    const role = user?.role || '';
    const hour = new Date().getHours();
    if (hour < 12) {
      return `Good Morning, ${role === 'Admin' ? 'Admin ' : ''}${userName}!`;
    } else if (hour < 18) {
      return `Good Afternoon, ${role === 'Admin' ? 'Admin ' : ''}${userName}!`;
    } else {
      return `Good Evening, ${role === 'Admin' ? 'Admin ' : ''}${userName}!`;
    }
  }
}
