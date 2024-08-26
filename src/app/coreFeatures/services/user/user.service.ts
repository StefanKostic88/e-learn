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
      .get<MyUsersResponse>(
        ' https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/my-users'
      )
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
      .get<MyUsersResponse>(
        'https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/trainers'
      )
      .pipe(
        map(({ data }) => data),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.message);
        })
      );
  }

  public addMyUsers(myUsers: string[]) {
    return this.http
      .post(
        ' https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/add-my-users',
        { myUsers }
      )
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.message);
        })
      );
  }

  public uploadUserImage(fileType: string, photoName: string) {
    return this.http
      .get<S3PutResponse>(
        `https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/import-photo?fileType=${fileType}&photoName=${photoName}`
      )
      .pipe(
        map(({ key, data }) => ({ key, data })),
        catchError((errorResponse) => {
          return throwError(errorResponse.message);
        })
      );
  }
}
