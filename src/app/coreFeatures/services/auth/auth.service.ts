import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';

import {
  LoginUser,
  ChangePassword,
  EditInterface,
  ChangePasswordResponse,
  LoginResponse,
  RegisterUser,
  CreatedUserResponse,
  UserEditResponse,
} from '../../models/user.model';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(data: LoginUser) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<LoginResponse>(
        'https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/login',
        data,
        {
          headers,
        }
      )
      .pipe(
        map(({ token }) => token),
        catchError((errorResponse: HttpErrorResponse) =>
          throwError(errorResponse.error.message)
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
        map((createdUserResponse) => createdUserResponse.data),
        catchError((err: HttpErrorResponse) => {
          return throwError(err.error.message);
        })
      );
  }

  public changePassword(inputData: ChangePassword) {
    return this.http
      .patch<ChangePasswordResponse>(
        environment.apiEndpoints.changePassword,
        inputData
      )
      .pipe(
        map(({ message }) => message),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return throwError(err.error.message);
        })
      );
  }

  public editUser(inputData: EditInterface) {
    return this.http
      .patch<UserEditResponse>(environment.apiEndpoints.editUser, inputData)
      .pipe(
        map(({ message }) => message),
        catchError((err: HttpErrorResponse) => throwError(err.error.message))
      );
  }
}
