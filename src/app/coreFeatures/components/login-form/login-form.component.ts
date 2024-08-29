import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  faEyeSlash,
  faLock,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { ButtonSize } from '../../../shared/models/button.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent, InputComponent } from '../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AuthStoreService } from '../../services/auth/auth-store.service';
import { UiService } from '../../services/uiService/ui.service';

import { FormService } from '../../services/form/form.service';
import { LoginUser } from '../../models/user.model';
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
  @Input() public captchValid: boolean = false;

  protected readonly buttonSize: typeof ButtonSize = ButtonSize;

  protected readonly loginError$?: Observable<string | null> =
    this.uiService.errorMessage$;

  protected readonly user = faUserAlt;
  protected readonly lock = faLock;
  protected readonly eye = faEyeSlash;

  protected loginForm!: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(
    private authStoreService: AuthStoreService,
    private uiService: UiService,
    private formService: FormService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formService.generateLoginFormFields();
    this.subscriptions.push(
      this.loginForm.valueChanges.subscribe(() => {
        this.uiService.resetErrorMessage();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.uiService.resetErrorMessage();
  }

  protected onSubmit(): void {
    if (this.captchValid) {
      const userCredentials: LoginUser = this.loginForm.value;
      this.subscriptions.push(
        this.authStoreService.logInUser(userCredentials).subscribe({
          next: (sucess) => {
            if (sucess) {
              this.routerService.toHomePage();
            }
          },
        })
      );

      this.loginForm.valid && this.loginForm.reset;
    } else {
      this.uiService.errorMessage = 'Please verify that you are human';
    }
  }
}
