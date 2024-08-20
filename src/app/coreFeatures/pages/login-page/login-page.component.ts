import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import {
  CustomImgComponent,
  PageWraperComponent,
  SpinerComponent,
} from '../../../shared';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { UiService } from '../../services/uiService/ui.service';
import { RecaptchaModule } from 'ng-recaptcha';

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
export class LoginPageComponent implements OnDestroy, AfterViewInit {
  // public captchaUnchecked = '../../../assets/imgs/captcha-uncheced.png';
  // public captchaChecked = '../../../assets/imgs/captcha-checed.png';
  private formSubscription?: Subscription;

  public isLoading$: Observable<boolean> = this.uiService.loadingSpiner;
  public captchaIsValid = false;
  protected siteKey = 'siteKey';

  // public captcha = this.captchaUnchecked;

  @ViewChild(LoginFormComponent) loginFormComponent?: LoginFormComponent;

  constructor(private uiService: UiService) {}

  ngAfterViewInit(): void {
    this.formSubscription =
      this.loginFormComponent?.loginForm.valueChanges.subscribe((el) => {
        if (el['username'].length > 0 && el['password'].length > 0) {
          // this.captcha = this.captchaChecked;
        }
      });
    console.log(this.loginFormComponent);
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  changeDET() {
    console.log('RENDER LOGIN PAGE');
  }

  resolvedCaptcha(captchaResponse: string | null) {
    this.captchaIsValid = !!captchaResponse;
    console.log(this.captchaIsValid);
  }
}
