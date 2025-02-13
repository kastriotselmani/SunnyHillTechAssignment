import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserDto } from '../models/user.dto';
import { updateUserDto } from '../models/updateUser.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl + '/auth/profile';

  constructor(private http: HttpClient) {}

  updateProfile(updateDto: updateUserDto): Observable<UserDto> {
    return this.http.put<UserDto>(this.apiUrl, updateDto);
  }
}