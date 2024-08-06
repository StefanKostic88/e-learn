import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { TrainingCreationAttribute } from '../../models/user.model';

interface Trainer {
  isActive: string;
  password: string;
  specialization: string;
  role: string;
  lastName: string;
  username: string;
  address?: string;
  email?: string;
  id: string;
  firstName: string;
  img?: string;
  dateOfBirth?: string;
}

interface TrainersResponse {
  data: Trainer[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}

  public getAllTrainers() {
    return this.http
      .get<TrainersResponse>(
        'https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/trainers'
      )
      .pipe(
        map(({ data }) => data),
        catchError((errResponse: HttpErrorResponse) => {
          return throwError(errResponse);
        })
      );
  }

  public createTraining(data: TrainingCreationAttribute) {
    return this.http
      .post(
        'https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/create-training',
        data
      )
      .pipe(
        catchError((errResponse: HttpErrorResponse) => {
          return throwError(errResponse.message);
        })
      );
  }

  // public getMyTrainings() {
  //   return this.http.get('').pipe(
  //     catchError((errResponse: HttpErrorResponse) => {
  //       return throwError(errResponse.message);
  //     })
  //   );
  // }
}
