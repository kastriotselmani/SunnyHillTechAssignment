import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return this.router.parseUrl('/auth/login');
  }
}