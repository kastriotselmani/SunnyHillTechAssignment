import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { LottieComponent, LottieDirective  } from 'ngx-lottie';
import { RegisterComponent } from './register/register.component';
import { MatIcon } from '@angular/material/icon';


@NgModule({
  declarations: 
  [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModule, 
    ReactiveFormsModule,
    CommonModule, 
    MatInputModule, 
    LottieComponent,
    LottieDirective,
    MatIcon
  ],

})
export class AuthModule { }
