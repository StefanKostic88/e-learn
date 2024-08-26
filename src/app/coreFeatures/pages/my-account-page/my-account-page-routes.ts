import { Routes } from '@angular/router';
import { MyAccountPageComponent } from './my-account-page.component';
import { ChangePasswordPageComponent } from '../change-password-page/change-password-page.component';
import { MyAccountBaseComponent } from './my-account-base/my-account-base.component';
import { MyAccountEditComponent } from './my-account-edit/my-account-edit.component';
import { MyAccountAddTrainerComponent } from './my-account-add-trainer/my-account-add-trainer.component';
import { CanDeactivateGuard } from '../../guards/canDeactivate.guard';
import { UserResolverService } from '../../resolvers/user.resolver.service';
import { EditUserReolverService } from '../../resolvers/edit-user.resolver.service';
import { LoadPageResolverService } from '../../resolvers/load-page.resolver.service';

export default [
  {
    path: '',
    component: MyAccountPageComponent,
    children: [
      {
        path: '',
        component: MyAccountBaseComponent,
        resolve: {
          user: UserResolverService,
        },
      },
      {
        path: 'change-password',
        component: ChangePasswordPageComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          pageLoading: LoadPageResolverService,
        },
      },
      {
        path: 'edit',
        component: MyAccountEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: EditUserReolverService,
        },
      },
      {
        path: 'add-trainer',
        component: MyAccountAddTrainerComponent,
      },
      {
        path: 'trainings',
        loadChildren: () => import('../training-page/training-page-routes'),
        resolve: {
          user: UserResolverService,
        },
      },
    ],
  },
] as Routes;
