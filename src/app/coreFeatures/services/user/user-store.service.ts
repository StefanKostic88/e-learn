import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  exhaustMap,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import {
  EditInterface,
  HeaderData,
  UserData,
  myStudent,
} from '../../models/user.model';
import { AuthStoreService } from '../auth/auth-store.service';

import { UiService } from '../uiService/ui.service';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { HttpClient } from '@angular/common/http';

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
    private authStoreService: AuthStoreService,
    private uiService: UiService,
    private sessionStorageService: SessionStorageService,
    private http: HttpClient
  ) {}

  set currentUser(val: null | UserData) {
    this.currentUser$$.next(val);
  }

  get currentUser(): Observable<UserData | null> {
    return this.currentUser$;
  }

  public getCurrentUser(): Observable<UserData | null> {
    return this.authStoreService.isAuthorized.pipe(
      exhaustMap((isAuthorized) => {
        if (isAuthorized) {
          return this.userService.getCurrentUser().pipe(
            tap((user) => {
              console.log(user);
              this.currentUser = user;
            }),
            catchError(() => {
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  public getUserHeaderData(): Observable<HeaderData> {
    const isAuthorized = this.authStoreService.isAuthorized;
    const currentUserData = this.currentUser$.pipe(
      map((user) => {
        if (user) {
          const userData = {
            email: user && user.email,
            username: user && user.username,
            img: user?.img ? user.img : this.defaultImgPath,
          };
          this.sessionStorageService.setHeaderData(userData);
          return userData;
        } else {
          const data = this.sessionStorageService.getHeaderData();

          const userData = data
            ? JSON.parse(data)
            : {
                email: null,
                username: null,
                img: null,
              };

          return userData;
        }
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

  public getCurrentUserRole() {
    return this.currentUser$.pipe(map((user) => user?.role));
  }

  public getUserId() {
    return this.currentUser$.pipe(map((user) => user?.id));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    this.uiService.loadingSpiner = true;
    return this.userService.getCurrentUser().pipe(
      map((data) => {
        const specialization = data.specialization;
        const role = data.role;
        const image = data.img;

        const userInputs = this.selectedProperitesTest(data, [
          'firstName',
          'lastName',
          'username',
          'email',
          'address',
          'dateOfBirth',
        ]);

        return { userInputs, specialization, role, image };
      }),
      map(({ userInputs, specialization, role, image }) => {
        const userInputsFinal = userInputs?.map((el) => ({
          formControlName: el['prop'],
          labelName: this.splitAndSwitchToUpper(el['prop']),
          value: el['value'],
        }));

        return { userInputsFinal, specialization, role, image };
      }),
      tap(() => {
        this.uiService.loadingSpiner = false;
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

  public getMyUsers(): Observable<myStudent[]> {
    return this.userService.getMyUsers().pipe(
      map((users) =>
        users.map((user) => ({
          isActive: Boolean(user.isActive),
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
        }))
      ),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getMyTrainers() {
    return this.userService.getMyUsers().pipe(
      map((users) =>
        users.map((user) => ({
          specialization: user.specialization,
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
        }))
      ),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getAllTrainers() {
    return this.userService.getAllTrainers().pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  public addMyUsers(myUsers: string[]) {
    return this.userService.addMyUsers(myUsers).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getUserImage() {
    return this.currentUser.pipe(
      map((user) => user?.img),
      tap((el) => console.log(el))
    );
  }

  public uploadUserPhotoAndEditUser(
    fileType: string,
    photoName: string,
    file: File,
    dataForUpdate: EditInterface
  ) {
    this.uiService.loadingSpiner = true;
    return this.userService.uploadUserImage(fileType, photoName).pipe(
      exhaustMap(({ key, data }) => {
        return this.http.put(data, file).pipe(
          exhaustMap(() => {
            const imgpath = `https://d354odvv3vtkqh.cloudfront.net/${key}`;
            return this.authStoreService.editCurrentUser({
              ...dataForUpdate,
              img: imgpath,
            });
          })
        );
      }),

      catchError((err) => {
        return throwError(err);
      })
    );
  }
}

// keyFinal = key;
// return this.http.put(data, this.file);
