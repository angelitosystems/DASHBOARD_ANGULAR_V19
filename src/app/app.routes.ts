import { Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Reports } from './pages/dashboard/reports/reports';
import { NotFound } from './pages/not-found/not-found.component';
import { Home } from './pages/dashboard/home/home';
import { Users } from './pages/dashboard/users/users.component';
import { Settings } from './pages/dashboard/settings/settings';
import { authGuard } from './common/guard/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      { path: 'home', component: Home },
      { path: 'users', component: Users },
      { path: 'reports', component: Reports },
      { path: 'settings', component: Settings },
    ],
  },
  { path: '404', component: NotFound },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];
