import {
  BehaviorSubject,
  Observable,
  catchError,
  exhaustMap,
  finalize,
  from,
  of,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from './auth.service';
import {
  ChangePassword,
  EditInterface,
  LoginUser,
  CreatedUser,
  RegisterUser,
} from '../../models/user.model';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { UiService } from '../uiService/ui.service';
import { RouterService } from '../router/router.service';
import { ToasterService } from '../toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  private createdUser$$: BehaviorSubject<CreatedUser | null> =
    new BehaviorSubject<CreatedUser | null>(null);

  public createdUser$ = this.createdUser$$.asObservable();

  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private uiService: UiService,
    private router: Router,
    private routerService: RouterService,
    private toasterService: ToasterService
  ) {}

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  get isAuthorized(): Observable<boolean> {
    this.isAuthorized = !!this.sessionStorageService.getToken();
    return this.isAuthorized$;
  }

  set createdUser(val: CreatedUser | null) {
    this.createdUser$$.next(val);
  }
  get createdUser(): Observable<CreatedUser | null> {
    return this.createdUser$;
  }

  public logInUser(data: LoginUser): Observable<string | null> {
    this.uiService.errorMessage = null;
    this.uiService.loadingSpiner = true;

    return this.authService.login(data).pipe(
      tap((JWT_TOKEN) => {
        if (JWT_TOKEN) {
          this.sessionStorageService.setToken(JWT_TOKEN);
          this.isAuthorized = !!this.sessionStorageService.getToken();
          this.uiService.errorMessage = null;
        }
      }),
      catchError((err) => {
        this.uiService.errorMessage = err;
        return of(null);
      }),
      finalize(() => {
        this.uiService.loadingSpiner = false;
      })
    );
  }

  public logOut(): void {
    this.sessionStorageService.deleteToken();
    this.sessionStorageService.deleteHeaderData();
    this.isAuthorized = !!this.sessionStorageService.getToken();
    this.uiService.errorMessage = null;
    this.uiService.loadingSpiner = false;
    this.router.navigate(['/']);
  }

  public registerAndGetInfo(data: RegisterUser) {
    this.uiService.loadingSpiner = true;
    this.uiService.actionSuccess = false;
    return this.authService.userRegistration(data).pipe(
      tap((user) => {
        this.createdUser = user;
      }),
      catchError((err) => {
        this.uiService.loadingSpiner = false;
        return this.resetRegisterStateAndShowError(err);
      }),
      exhaustMap((createdUser) => {
        if (createdUser) {
          return from(this.logInUser(createdUser as CreatedUser)).pipe(
            catchError((err: string) => {
              return this.resetRegisterStateAndShowError(err);
            }),
            tap(() => {
              this.uiService.actionSuccess = true;
            })
          );
        }

        return of(null);
      })
    );
  }

  public resetRegisterMyAccount() {
    this.uiService.loadingSpiner = true;
    this.uiService.resetErrorAndSucessState();
    this.createdUser = null;
    this.routerService.toMyAccount();
  }

  public changeUserPassword(inputData: ChangePassword) {
    this.uiService.loadingSpiner = true;

    return this.authService.changePassword(inputData).pipe(
      tap(() => {
        this.toasterService.toasterState = {
          isOpened: true,
          message: 'Password changed',
        };
        this.uiService.loadingSpiner = false;
        this.uiService.resetErrorMessage();
        this.routerService.toMyAccount();
      }),
      catchError((err: string) => {
        this.uiService.errorMessage = err;
        this.uiService.loadingSpiner = false;
        this.toasterService.resetToasterState();

        return throwError(err);
      })
    );
  }

  private resetRegisterStateAndShowError(err: string) {
    this.uiService.actionSuccess = false;
    this.uiService.errorMessage = err;
    return of(null);
  }

  public editCurrentUser(inputData: EditInterface) {
    this.uiService.loadingSpiner = true;
    return this.authService.editUser(inputData).pipe(
      tap(() => {
        this.uiService.loadingSpiner = false;
        this.toasterService.toasterState = {
          isOpened: true,
          message: 'User data changed',
        };
        this.routerService.toMyAccount();
      }),
      catchError((err) => {
        this.uiService.loadingSpiner = false;
        this.toasterService.resetToasterState();
        return throwError(err);
      })
    );
  }
}
