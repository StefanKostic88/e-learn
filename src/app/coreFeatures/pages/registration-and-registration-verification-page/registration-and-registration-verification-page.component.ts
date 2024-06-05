import { Component } from '@angular/core';
import { IconDefinition, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  ButtonComponent,
  InputComponent,
  PageWraperComponent,
  SpinerComponent,
} from '../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, NgIf } from '@angular/common';
import { of } from 'rxjs';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';

const components = [
  PageWraperComponent,
  ButtonComponent,
  InputComponent,
  RegistrationFormComponent,
  SpinerComponent,
];

@Component({
  selector: 'app-registration-and-registration-verification-page',
  standalone: true,
  imports: [components, FontAwesomeModule, NgIf, AsyncPipe],
  templateUrl:
    './registration-and-registration-verification-page.component.html',
  styleUrl: './registration-and-registration-verification-page.component.scss',
})
export class RegistrationAndRegistrationVerificationPageComponent {
  checkIcon: IconDefinition = faCheck;

  // public readonly registrationPending$ = this.authStoreService.loadingSpiner;
  // public readonly registrationSuccess$ =
  //   this.authStoreService.registrationSuccess;
  // public readonly createdUser$ = this.authStoreService.createdUser;
  public readonly registrationPending$ = of(false);
  public readonly registrationSuccess$ = of(false);

  public readonly createdUser$ = of({ password: 'asdasd', username: 'asdasd' });

  // constructor(private authStoreService: AuthStoreService) {}

  protected navigeteToMyAccount() {
    // this.authStoreService.switchToMyaccount();
  }
}
