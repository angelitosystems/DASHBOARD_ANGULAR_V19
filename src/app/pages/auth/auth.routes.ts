import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { guestGuard } from '../../common/guard/guest-guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestGuard]
  }
];
