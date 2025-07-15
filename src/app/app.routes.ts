import { Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Home } from './pages/dashboard/home/home.component';
import { Countries } from './pages/dashboard/countries/countries.component';
import { Statistics } from './pages/dashboard/statistics/statistics.component';
import { Settings } from './pages/dashboard/settings/settings.component';
import { NotFound } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: '', component: Home },
      { path: 'home', component: Home },
      { path: 'countries', component: Countries },
      { path: 'statistics', component: Statistics },
      { path: 'settings', component: Settings },
    ],
  },
  { path: '404', component: NotFound },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];
