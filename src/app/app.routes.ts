import { Routes } from '@angular/router';
import { HomePageComponent } from './coreFeatures/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'blog',
    component: HomePageComponent,
  },
  {
    path: 'pricing',
    component: HomePageComponent,
  },
  {
    path: 'about-us',
    component: HomePageComponent,
  },
  {
    path: 'my-account',
    component: HomePageComponent,
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./coreFeatures/pages/login-page/login-page-routes'),
    // canActivate: [SignedInGuard],
  },

  {
    path: 'join-us',
    loadChildren: () =>
      import('./coreFeatures/pages/join-us-page/join-us-page-routes'),
  },
];
