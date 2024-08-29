import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserDataRespnse,
  MyUsersResponse,
  S3PutResponse,
} from '../../models/user.model';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getCurrentUser() {
    return this.http
      .get<UserDataRespnse>(environment.apiEndpoints.myAccount)
      .pipe(
        map(({ data }) => data),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.message);
        })
      );
  }

  public getMyUsers() {
    return this.http
      .get<MyUsersResponse>(environment.apiEndpoints.myUsers)
      .pipe(
        map(({ data }) => data),
        catchError((errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          return throwError(errorResponse.message);
        })
      );
  }

  public getAllTrainers() {
    return this.http
      .get<MyUsersResponse>(environment.apiEndpoints.allTrainers)
      .pipe(
        map(({ data }) => data),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.message);
        })
      );
  }

  public addMyUsers(myUsers: string[]) {
    return this.http
      .post(environment.apiEndpoints.addMyUsers, { myUsers })
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.message);
        })
      );
  }

  public uploadUserImage(fileType: string, photoName: string) {
    return this.http
      .get<S3PutResponse>(
        environment.apiEndpoints.uploadPhoto +
          `?fileType=${fileType}&photoName=${photoName}`
      )
      .pipe(
        map(({ key, data }) => ({ key, data })),
        catchError((errorResponse) => {
          return throwError(errorResponse.message);
        })
      );
  }
}
