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
export class UserResolverService implements Resolve<UserData | null> {
  constructor(
    private userStoreService: UserStoreService,
    private authStoreService: AuthStoreService,
    private uiService: UiService
  ) {}

  resolve(): Observable<UserData | null> {
    this.uiService.loadingSpiner = true;
    return this.authStoreService.isAuthorized.pipe(
      take(1),
      switchMap((isAuthorized) => {
        if (isAuthorized) {
          return this.userStoreService.getCurrentUser();
        } else {
          return of(null);
        }
      }),
      finalize(() => (this.uiService.loadingSpiner = false))
    );
  }
}
