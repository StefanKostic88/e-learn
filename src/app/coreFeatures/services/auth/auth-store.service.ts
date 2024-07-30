import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from './auth.service';
import {
  ChangePassword,
  EditInterface,
  LoginUser,
  CreatedUser,
} from '../../models/user.model';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { UiService } from '../uiService/ui.service';

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

  private registrationSuccess$$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  public registrationSuccess$ = this.registrationSuccess$$.asObservable();

  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private uiService: UiService,
    private router: Router
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

  set registrationSuccess(val: boolean) {
    this.registrationSuccess$$.next(val);
  }
  get registrationSuccess(): Observable<boolean> {
    return this.registrationSuccess$;
  }

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
        // this.errorMessage = err;
        this.uiService.errorMessage = err;
        // this.loadingSpiner = false;
        this.uiService.loadingSpiner = false;
        return throwError(err);
      }),
      tap(() => {
        // this.loadingSpiner = false;
        this.uiService.loadingSpiner = false;
        this.router.navigate(['/']);
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

  // public registerAndGetInfo(data: RegisterUser): Observable<string | null> {
  //   this.loadingSpiner = true;
  //   return this.authService.userRegistration(data).pipe(
  //     map((res) => {
  //       this.createdUser = res.data;
  //       return res.data;
  //     }),
  //     catchError((err: string) => {
  //       return this.resetRegisterStateAndShowError(err);
  //     }),
  //     exhaustMap((createdUser) =>
  //       from(this.logInUser(createdUser as CreatedUser)).pipe(
  //         catchError((err: string) => {
  //           return this.resetRegisterStateAndShowError(err);
  //         }),
  //         tap(() => {
  //           this.registrationSuccess = true;
  //           this.loadingSpiner = false;
  //         })
  //       )
  //     )
  //   );
  // }

  public switchToMyaccount(): void {
    this.registrationSuccess = false;
    // this.errorMessage = null;
    this.router.navigate(['/my-account']);
  }

  public chnagUserPasswrod(inputData: ChangePassword) {
    // this.errorMessage = null;
    // this.loadingSpiner = true;
    return this.authService.changePassword(inputData).pipe(
      map((data) => data),
      catchError((err: string) => {
        // this.errorMessage = err;
        // this.loadingSpiner = false;

        return throwError(err);
      }),
      tap(() => {
        this.registrationSuccess = true;
        // this.loadingSpiner = false;
      })
    );
  }

  private resetRegisterStateAndShowError(err: string) {
    this.registrationSuccess = false;
    // this.loadingSpiner = false;
    // this.errorMessage = err;
    return throwError(err);
  }

  public editCurrentUser(inputData: EditInterface) {
    return this.authService
      .editUser(inputData)
      .pipe(tap((d) => console.log(d)));
  }
}
