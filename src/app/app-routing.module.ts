import { Routes } from '@angular/router';
import { FullComponent } from './pages/layouts/full/full.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const Approutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./component/component.module').then(
            (m) => m.ComponentsModule
          ),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
];
