import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import {
  CustomImgComponent,
  PageWraperComponent,
  SpinerComponent,
} from '../../../shared';
import { RouterLink } from '@angular/router';

import { AsyncPipe, NgIf } from '@angular/common';
import { UiService } from '../../services/uiService/ui.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../enviroment';

const components = [
  CustomImgComponent,
  LoginFormComponent,
  PageWraperComponent,
  SpinerComponent,
];
const modules = [RouterLink, NgIf, AsyncPipe, RecaptchaModule];

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [components, modules],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  protected captchaIsValid = false;

  protected siteKey = environment.captchaSiteKey;

  constructor(private uiService: UiService) {}

  protected resolvedCaptcha(captchaResponse: string | null) {
    this.uiService.resetErrorMessage();
    this.captchaIsValid = !!captchaResponse;
  }
}
