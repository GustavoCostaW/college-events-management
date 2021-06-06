import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { AuthGuard } from './auth/auth.guard.service';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'events',
    canActivate: [AngularFireAuthGuard, AuthGuard],
    data: { authGuardPipe: () => redirectToLogin() },
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'export',
    canActivate: [AngularFireAuthGuard, AuthGuard],
    data: { authGuardPipe: () => redirectToLogin() },
    loadChildren: () =>
      import('./export/export.module').then((m) => m.ExportModule),
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
