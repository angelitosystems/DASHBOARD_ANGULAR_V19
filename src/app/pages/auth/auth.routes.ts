import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  }
];
