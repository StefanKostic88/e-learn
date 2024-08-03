import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { HeaderData, UserData, UserDataRespnse } from '../../models/user.model';
import { AuthStoreService } from '../auth/auth-store.service';
import { environment } from '../../../enviroment';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private defaultImgPath = '../../../../assets/imgs/no-user-img.jpg';

  private currentUser$$: BehaviorSubject<UserData | null> =
    new BehaviorSubject<UserData | null>(null);

  public currentUser$: Observable<UserData | null> =
    this.currentUser$$.asObservable();

  constructor(
    private userService: UserService,
    private authStoreService: AuthStoreService
  ) {}

  set currentUser(val: null | UserData) {
    this.currentUser$$.next(val);
  }

  get currentUser(): Observable<UserData | null> {
    return this.currentUser$;
  }

  public getCurrentUser(): Observable<UserData | null> {
    return this.userService.getCurrentUser().pipe(
      tap((user) => {
        this.currentUser = user;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  public getUserHeaderData(): Observable<HeaderData> {
    const isAuthorized = this.authStoreService.isAuthorized;
    const currentUserData = this.currentUser$.pipe(
      map((user) => {
        const userData = {
          email: user && user.email,
          username: user && user.username,
          img: user?.img ? user.img : this.defaultImgPath,
        };
        return userData;
      })
    );

    return combineLatest([isAuthorized, currentUserData]).pipe(
      map(([isAuthorized, currentUserData]) => {
        const result = {
          isAuthorized,
          accountData: currentUserData,
        };
        return result;
      })
    );
  }

  public getAccountData() {
    return this.currentUser$.pipe(
      map((currentUser) => {
        return this.selectedProperites(
          currentUser,
          [
            'firstName',
            'lastName',
            'username',
            'address',
            'email',
            'dateOfBirth',
          ],
          currentUser
        );
      })
    );
  }

  private selectedProperites<T extends Record<string, any>, K extends keyof T>(
    obj: T | null,
    props: K[],
    userType: UserData | null
  ) {
    if (!obj) return;

    let data = this.generateBasicInfoList(props, obj) as Array<{
      [key: string]: string | T[K];
    }>;

    if (userType?.role === 'trainer') {
      const specializationName = userType.specialization?.toLowerCase();

      const specializationNameFirstLetter =
        specializationName?.[0].toUpperCase();
      const specializationRest = specializationName?.slice(1);

      const addedSpecialization = {
        Specialization:
          specializationNameFirstLetter &&
          specializationNameFirstLetter + specializationRest,
      } as { [key: string]: string | T[K] };

      const firstPart = data.slice(0, 3);
      const secondPart = data.slice(3);

      data = [...firstPart, addedSpecialization, ...secondPart];
    }

    return data;
  }

  private generateBasicInfoList<T, K extends keyof T>(data: K[], obj: T) {
    return data.map((prop) => {
      const newDataProp = prop;

      const value = obj[prop] ? obj[prop] : 'None set';
      const name = this.splitAndSwitchToUpper(newDataProp as string);
      return {
        [name]: value,
      };
    });
  }
  private splitAndSwitchToUpper(input: string): string {
    return input
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  public removeCurrentUser() {
    this.currentUser = null;
  }

  public getCurrentUserInputs() {
    return this.userService.getCurrentUser().pipe(
      map((data) => {
        const specialization = data.specialization;
        const userInputs = this.selectedProperitesTest(data, [
          'firstName',
          'lastName',
          'username',
          'email',
          'address',
          'dateOfBirth',
        ]);

        return { userInputs, specialization };
      }),
      map(({ userInputs, specialization }) => {
        const userInputsFinal = userInputs?.map((el) => ({
          formControlName: el['prop'],
          labelName: this.splitAndSwitchToUpper(el['prop']),
          value: el['value'],
        }));

        return { userInputsFinal, specialization };
      })
    );
  }
  private selectedProperitesTest<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Record<string, any>,
    K extends keyof T
  >(obj: T | null, props: K[]) {
    if (!obj) return;
    const value = props.map((prop) => ({
      value: obj[prop],
      prop: prop,
    }));
    return value;
  }

  public getUserSpecialization() {
    return this.userService.getCurrentUser().pipe(
      tap((el) => console.log(el, 'asdasd')),
      map((user) => user.specialization),
      tap((el) => console.log(el, 'asdasd'))
    );
  }
}
