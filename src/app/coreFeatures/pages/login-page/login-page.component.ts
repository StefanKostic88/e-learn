import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CustomImgComponent, PageWraperComponent } from '../../../shared';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

const components = [
  CustomImgComponent,
  LoginFormComponent,
  PageWraperComponent,
];

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [components, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnDestroy, AfterViewInit {
  public captchaUnchecked = '../../../assets/imgs/captcha-uncheced.png';
  public captchaChecked = '../../../assets/imgs/captcha-checed.png';
  private formSubscription?: Subscription;

  public captcha = this.captchaUnchecked;

  @ViewChild(LoginFormComponent) loginFormComponent?: LoginFormComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.formSubscription =
      this.loginFormComponent?.loginForm.valueChanges.subscribe((el) => {
        if (el['username'].length > 0 && el['password'].length > 0) {
          this.captcha = this.captchaChecked;
        }
      });
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }
}
