import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
      },
    {
      path: 'products',
      loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule),
      canActivate: [AuthGuard]  
    },
    {
      path: 'profile',
      loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
      canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/auth/login' }
  ];