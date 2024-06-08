import { Routes } from '@angular/router';
import { HomePageComponent } from './coreFeatures/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./coreFeatures/pages/blog-page/blog-page.routes'),
  },
  {
    path: 'pricing',
    component: HomePageComponent,
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./coreFeatures/pages/about-us-page/about-us-page.routes'),
  },
  {
    path: 'my-account',
    loadChildren: () =>
      import('./coreFeatures/pages/my-account-page/my-account-page-routes'),
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
