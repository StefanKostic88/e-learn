import { Resolve } from '@angular/router';
import { UserData } from '../models/user.model';
import { Injectable } from '@angular/core';
import { UserStoreService } from '../services/user/user-store.service';
import { finalize, Observable, of, switchMap, take } from 'rxjs';
import { AuthStoreService } from '../services/auth/auth-store.service';
import { UiService } from '../services/uiService/ui.service';

@Injectable({
  providedIn: 'root',
})
export class EditUserReolverService
  implements
    Resolve<{
      userInputsFinal:
        | {
            formControlName:
              | 'firstName'
              | 'lastName'
              | 'username'
              | 'email'
              | 'address'
              | 'dateOfBirth';
            labelName: string;
            value: string | undefined;
          }[]
        | undefined;
      specialization: string | undefined;
    }>
{
  constructor(
    private userStoreService: UserStoreService,
    private authStoreService: AuthStoreService,
    private uiService: UiService
  ) {}

  resolve(): Observable<{
    userInputsFinal:
      | {
          formControlName:
            | 'firstName'
            | 'lastName'
            | 'username'
            | 'email'
            | 'address'
            | 'dateOfBirth';
          labelName: string;
          value: string | undefined;
        }[]
      | undefined;
    specialization: string | undefined;
  }> {
    return this.userStoreService.getCurrentUserInputs();
  }
}
