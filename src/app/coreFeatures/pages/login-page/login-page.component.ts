import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { PageWraperComponent } from '../../../shared';
import { RouterLink } from '@angular/router';

import { UiService } from '../../services/uiService/ui.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../enviroment';

const components = [LoginFormComponent, PageWraperComponent];
const modules = [RouterLink, RecaptchaModule];

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
