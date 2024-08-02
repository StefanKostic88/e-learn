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
import { UiService } from '../../services/uiService/ui.service';
import { AuthStoreService } from '../../services/auth/auth-store.service';
import { RouterService } from '../../services/router/router.service';

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
  protected checkIcon: IconDefinition = faCheck;
  protected readonly registrationPending$ = this.uiService.loadingSpiner;
  protected readonly registrationSuccess$ = this.uiService.actionSuccess;
  protected readonly createdUser$ = this.authStoreService.createdUser;

  constructor(
    private uiService: UiService,
    private authStoreService: AuthStoreService,
    private routerService: RouterService
  ) {}

  protected navigeteToMyAccount() {
    this.routerService.toMyAccount();
  }
}
