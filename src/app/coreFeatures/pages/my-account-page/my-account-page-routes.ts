import { Routes } from '@angular/router';
import { MyAccountPageComponent } from './my-account-page.component';
import { ChangePasswordPageComponent } from '../change-password-page/change-password-page.component';
import { MyAccountBaseComponent } from './my-account-base/my-account-base.component';
import { MyAccountEditComponent } from './my-account-edit/my-account-edit.component';
import { MyAccountAddTrainerComponent } from './my-account-add-trainer/my-account-add-trainer.component';
import { CanDeactivateGuard } from '../../guards/canDeactivate.guard';

export default [
  {
    path: '',
    component: MyAccountPageComponent,
    children: [
      { path: '', component: MyAccountBaseComponent },
      {
        path: 'change-password',
        component: ChangePasswordPageComponent,
      },
      {
        path: 'edit',
        component: MyAccountEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'add-trainer',
        component: MyAccountAddTrainerComponent,
      },
      {
        path: 'trainings',
        loadChildren: () => import('../training-page/training-page-routes'),
      },
    ],
  },
] as Routes;
