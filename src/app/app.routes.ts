import { Routes } from '@angular/router';
import { HomePageComponent } from './coreFeatures/pages/home-page/home-page.component';
import { AuthorizedGuard } from './coreFeatures/guards/authorized.guard';
import { SignedInGuard } from './coreFeatures/guards/isSignedIn.guard';
import { UserResolverService } from './coreFeatures/resolvers/user.resolver.service';
import { LoadPageResolverService } from './coreFeatures/resolvers/load-page.resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    resolve: {
      user: UserResolverService,
    },
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./coreFeatures/pages/blog-page/blog-page.routes'),
    resolve: {
      pageLoading: LoadPageResolverService,
    },
  },
  {
    path: 'pricing',
    loadChildren: () =>
      import('./coreFeatures/pages/pricing-page//pricing-page.routes'),
    resolve: {
      pageLoading: LoadPageResolverService,
    },
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./coreFeatures/pages/about-us-page/about-us-page.routes'),
    resolve: {
      pageLoading: LoadPageResolverService,
    },
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./coreFeatures/pages/features-page/features-page.routes'),
    resolve: {
      pageLoading: LoadPageResolverService,
    },
  },
  {
    path: 'my-account',
    loadChildren: () =>
      import('./coreFeatures/pages/my-account-page/my-account-page-routes'),
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./coreFeatures/pages/login-page/login-page-routes'),
    canActivate: [SignedInGuard],
  },

  {
    path: 'join-us',
    loadChildren: () =>
      import('./coreFeatures/pages/join-us-page/join-us-page-routes'),
    canActivate: [SignedInGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
