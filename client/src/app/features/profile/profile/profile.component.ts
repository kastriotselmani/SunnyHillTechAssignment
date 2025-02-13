// src/app/features/profile/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserDto } from '../../../models/user.dto';
import { ProfileService } from '../../../services/profile.service';
import { updateUserDto } from '../../../models/updateUser.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:false
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: UserDto;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private profileService: ProfileService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.errorMessage = 'User information not available.';
    }

    this.profileForm = this.fb.group(
      {
        name: [this.user?.name || '', Validators.required],
        email: [this.user?.email || '', [Validators.required, Validators.email]],
        currentPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if newPassword and confirmPassword match (if one is provided)
  passwordMatchValidator(form: AbstractControl) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (newPassword || confirmPassword) {
      return newPassword === confirmPassword ? null : { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updateDto: updateUserDto = this.profileForm.value;
      
      // If the user wants to change the password, the current password must be provided.
      if (updateDto.newPassword && !updateDto.currentPassword) {
        this.errorMessage = 'Please provide your current password to change your password.';
        this.successMessage = '';
        return;
      }

      this.profileService.updateProfile(updateDto).subscribe({
        next: (updatedUser) => {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.user = updatedUser;
          this.successMessage = 'Profile updated successfully!';
          this.errorMessage = '';
          // Clear password fields after successful update
          this.profileForm.patchValue({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          this.errorMessage = 'Error updating profile. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
      this.successMessage = '';
    }
  }
}
