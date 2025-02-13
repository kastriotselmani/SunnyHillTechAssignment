export interface updateUserDto {
    name: string;
    email: string;
    currentPassword?: string; 
    newPassword?: string;
    confirmPassword?: string;
  }