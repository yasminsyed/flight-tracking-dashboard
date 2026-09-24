import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
   {
    path: 'dashboard',
    title: 'Aviation Ops | Dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard').then(m => m.DashboardComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
