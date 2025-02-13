import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  private animationItem: AnimationItem | null = null;

  options: AnimationOptions = {
    path: 'assets/animation.json',
  };

  animationCreated(animationItem: AnimationItem): void {
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (userData) => {
          localStorage.setItem('token', userData.token);
          localStorage.setItem('user', JSON.stringify(userData)); 
          this.router.navigate(['/home']); 
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = error.error?.message || 'Invalid credentials. Please try again.';
        }
      });
    }
  }
  
}