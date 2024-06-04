import { Routes } from '@angular/router';
import { JoinUsPageComponent } from './join-us-page.component';
import { RegistrationAndRegistrationVerificationPageComponent } from '../registration-and-registration-verification-page/registration-and-registration-verification-page.component';

export default [
  {
    path: '',
    component: JoinUsPageComponent,
  },
  {
    path: 'trainer-register',
    component: RegistrationAndRegistrationVerificationPageComponent,
    data: {
      role: 'trainer',
    },
  },
  {
    path: 'student-register',
    component: RegistrationAndRegistrationVerificationPageComponent,
    data: { role: 'student' },
  },
] as Routes;
