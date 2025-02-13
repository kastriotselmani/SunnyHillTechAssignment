import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  private animationItem: AnimationItem | null = null;

  options: AnimationOptions = {
    path: 'assets/animation.json',
  };

  animationCreated(animationItem: AnimationItem): void {
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (user) => {
          console.log('User registered:', user);
          this.router.navigate(['/auth/login']); // Redirect to login page
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }
}
