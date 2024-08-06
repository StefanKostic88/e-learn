import {
  BehaviorSubject,
  Observable,
  catchError,
  exhaustMap,
  from,
  map,
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

  // private errorMessage$$: BehaviorSubject<null | string> = new BehaviorSubject<
  //   string | null
  // >(null);

  // public errorMessage$: Observable<string | null> =
  //   this.errorMessage$$.asObservable();

  // private loadingSpiner$$: BehaviorSubject<boolean> = new BehaviorSubject(
  //   false
  // );
  // public loadingSpiner$: Observable<boolean> =
  //   this.loadingSpiner$$.asObservable();

  // private registrationSuccess$$: BehaviorSubject<boolean> = new BehaviorSubject(
  //   false
  // );

  // public registrationSuccess$ = this.registrationSuccess$$.asObservable();

  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private uiService: UiService,
    private router: Router,
    private routerService: RouterService
  ) {}

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  get isAuthorized(): Observable<boolean> {
    this.isAuthorized = !!this.sessionStorageService.getToken();
    return this.isAuthorized$;
  }

  // set errorMessage(value: null | string) {
  //   this.errorMessage$$.next(value);
  // }
  // get errorMessage(): Observable<null | string> {
  //   return this.errorMessage$;
  // }

  // set loadingSpiner(val: boolean) {
  //   this.loadingSpiner$$.next(val);
  // }
  // get loadingSpiner(): Observable<boolean> {
  //   return this.loadingSpiner$;
  // }

  // set registrationSuccess(val: boolean) {
  //   this.registrationSuccess$$.next(val);
  // }
  // get registrationSuccess(): Observable<boolean> {
  //   return this.registrationSuccess$;
  // }

  set createdUser(val: CreatedUser | null) {
    this.createdUser$$.next(val);
  }
  get createdUser(): Observable<CreatedUser | null> {
    return this.createdUser$;
  }

  public logInUser(data: LoginUser): Observable<string | null> {
    // this.errorMessage = null;
    this.uiService.errorMessage = null;
    // this.loadingSpiner = true;
    this.uiService.loadingSpiner = true;

    return this.authService.login(data).pipe(
      tap((JWT_TOKEN) => {
        if (JWT_TOKEN) {
          this.sessionStorageService.setToken(JWT_TOKEN);
          this.isAuthorized = !!this.sessionStorageService.getToken();
        }
      }),
      catchError((err) => {
        this.uiService.errorMessage = err;
        this.uiService.loadingSpiner = false;
        return throwError(err);
      }),
      tap(() => {
        this.uiService.loadingSpiner = false;
      })
    );
  }

  public logOut(): void {
    this.sessionStorageService.deleteToken();
    this.isAuthorized = !!this.sessionStorageService.getToken();
    this.router.navigate(['/']);
  }

  public resetErrorMsgState(): void {
    // this.errorMessage = null;
    this.uiService.errorMessage = null;
  }

  public registerAndGetInfo(data: RegisterUser) {
    this.uiService.loadingSpiner = true;
    return this.authService.userRegistration(data).pipe(
      tap((user) => {
        this.createdUser = user;
      }),
      catchError((err) => {
        this.uiService.loadingSpiner = false;
        return this.resetRegisterStateAndShowError(err);
      }),
      exhaustMap((createdUser) =>
        from(this.logInUser(createdUser as CreatedUser)).pipe(
          catchError((err: string) => {
            return this.resetRegisterStateAndShowError(err);
          }),
          tap(() => {
            this.uiService.actionSuccess = true;
            this.uiService.loadingSpiner = false;
          })
        )
      )
    );
  }

  // public switchToMyaccount(): void {
  //   // this.registrationSuccess = false;
  //   // this.errorMessage = null;
  //   this.router.navigate(['/my-account']);
  // }

  public changeUserPassword(inputData: ChangePassword) {
    this.uiService.errorMessage = null;
    this.uiService.loadingSpiner = true;
    return this.authService.changePassword(inputData).pipe(
      map((data) => data),
      tap(() => {
        this.uiService.actionSuccess = true;
        this.uiService.loadingSpiner = false;
      }),
      catchError((err: string) => {
        this.uiService.errorMessage = err;
        this.uiService.loadingSpiner = false;
        this.uiService.actionSuccess = false;
        return of(null);
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
        this.routerService.toMyAccount();
      }),
      catchError((err) => {
        this.uiService.loadingSpiner = false;
        return throwError(err);
      })
    );
  }
}
