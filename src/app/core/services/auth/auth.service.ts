import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

import {
  LoginUser,
  RegisterUser,
  CreatedUserResponse,
  ChangePassword,
  EditInterface,
  ChangePasswordResponse,
  LoginResponse,
  UserDataRespnse,
} from '../../models/user.model';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(data: LoginUser) {
    return this.http
      .post<LoginResponse>(environment.apiEndpoints.login, data)
      .pipe(
        map(({ token }) => token),
        catchError((err: HttpErrorResponse) =>
          throwError(err.error.error.message)
        )
      );
  }

  public userRegistration(registerData: RegisterUser) {
    return this.http
      .post<CreatedUserResponse>(
        environment.apiEndpoints.register,
        registerData
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err.error.error.message);
        })
      );
  }

  public changePassword(inputData: ChangePassword) {
    console.log(inputData);
    return this.http
      .patch<ChangePasswordResponse>(
        environment.apiEndpoints.changePassword,
        inputData
      )
      .pipe(
        map(({ data }) => data),
        catchError((err: HttpErrorResponse) =>
          throwError(err.error.error.message)
        )
      );
  }

  public editUser(inputData: EditInterface) {
    return this.http
      .patch<UserDataRespnse>(environment.apiEndpoints.editUser, inputData)
      .pipe(
        map(({ data }) => data),
        catchError((err: HttpErrorResponse) =>
          throwError(err.error.error.message)
        )
      );
  }
}
