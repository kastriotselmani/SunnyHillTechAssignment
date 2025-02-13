import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserDto } from '../models/user.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<UserDto> {
    const payload = { email, password };
    return this.http.post<UserDto>('/api/auth/login', payload);
  }

  register(user: { name: string; email: string; password: string }): Observable<UserDto> {
    return this.http.post<UserDto>(`/api/auth/register`, user);
  }

  refreshToken(refreshToken: string): Observable<{ token: string; refreshToken: string }> {
    return this.http.post<{ token: string; refreshToken: string }>(
      '/api/auth/refresh-token',
      { refreshToken }
    );
  }
  

  logout(): Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return of({ message: 'Logged out successfully.' });
  }
}