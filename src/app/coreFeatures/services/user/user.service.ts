import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataRespnse } from '../../models/user.model';
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
}
