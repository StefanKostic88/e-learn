import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faEyeSlash,
  faLock,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription, tap } from 'rxjs';
import { ButtonSize } from '../../../shared/models/button.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonComponent, InputComponent } from '../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AuthStoreService } from '../../services/auth/auth-store.service';
import { UiService } from '../../services/uiService/ui.service';
import { RouterService } from '../../services/router/router.service';

const components = [ButtonComponent, InputComponent];
const modules = [FontAwesomeModule, ReactiveFormsModule, CommonModule];

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [components, modules],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  protected readonly user = faUserAlt;
  protected readonly lock = faLock;
  protected readonly eye = faEyeSlash;
  protected loginError$?: Observable<string | null> =
    this.uiService.errorMessage$;

  protected buttonSize: typeof ButtonSize = ButtonSize;

  public loginForm!: FormGroup;
  protected formIsValid = true;
  private authSubscription?: Subscription;

  constructor(
    private authStoreService: AuthStoreService,
    private uiService: UiService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('Stefi', [Validators.required]),
      password: new FormControl('dEHa8VPz', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  protected onSubmit() {
    const userCredentials = this.loginForm.value;

    this.authSubscription = this.authStoreService
      .logInUser(userCredentials)
      .pipe(tap(() => this.routerService.toHomePage()))
      .subscribe();

    this.loginForm.valid && this.loginForm.reset;
  }
}
