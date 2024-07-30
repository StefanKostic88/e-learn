import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faEyeSlash,
  faLock,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
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
  public readonly user = faUserAlt;
  public readonly lock = faLock;
  public readonly eye = faEyeSlash;
  public loginError$?: Observable<string | null> =
    this.authStoreService.errorMessage$;

  public buttonSize: typeof ButtonSize = ButtonSize;

  public loginForm!: FormGroup;
  public formIsValid = true;
  private authSubscription?: Subscription;

  constructor(private authStoreService: AuthStoreService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('Sn_59a1', [Validators.required]),
      password: new FormControl('dEHa8VPz', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    // this.authStoreService.resetErrorMsgState();
  }

  protected onSubmit() {
    const userCredentials = this.loginForm.value;
    console.log(userCredentials);
    this.authSubscription = this.authStoreService
      .logInUser(userCredentials)
      .subscribe(console.log);
    // .pipe(tap(() => this.router.navigate(['/'])))

    this.loginForm.valid && this.loginForm.reset;
  }
}
