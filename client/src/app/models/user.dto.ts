export interface UserDto {
    email: string;
    name: string;
    role: string;
    lastLogin: Date;
    token: string;
    refreshToken?: string; 
  }