import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faEyeSlash,
  faLock,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, of } from 'rxjs';
import { ButtonSize } from '../../../shared/models/button.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent, InputComponent } from '../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

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
  // public loginError$?: Observable<string | null> =
  //   this.authStoreService.errorMessage$;
  public loginError$ = of(false);
  public buttonSize: typeof ButtonSize = ButtonSize;

  public loginForm!: FormGroup;
  public formIsValid = true;
  private authSubscription?: Subscription;

  constructor(
    // private authStoreService: AuthStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('stef111', [Validators.required]),
      password: new FormControl('test', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    // this.authStoreService.resetErrorMsgState();
  }

  protected onSubmit() {
    const userCredentials = this.loginForm.value;
    console.log(userCredentials);
    // this.authSubscription = this.authStoreService
    //   .logInUser(userCredentials)
    //   .pipe(tap(() => this.router.navigate(['/'])))
    //   .subscribe();

    this.loginForm.valid && this.loginForm.reset;
  }
}
