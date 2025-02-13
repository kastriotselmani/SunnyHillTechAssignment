import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIf, CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, TranslateModule, NgIf]
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang() ?? 'en';
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Logout error', err);
        this.router.navigate(['/auth/login']);
      }
    });
  }
}