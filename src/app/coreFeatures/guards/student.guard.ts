import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserStoreService } from '../services/user/user-store.service';
import { map, Observable } from 'rxjs';
import { RouterService } from '../services/router/router.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(
    private userStoreService: UserStoreService,
    private routerService: RouterService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot // eslint-disable-line @typescript-eslint/no-unused-vars
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userStoreService.getCurrentUser().pipe(
      map((user) => {
        if (user?.role === 'student') {
          return true;
        }

        this.routerService.toMyAccount();
        return false;
      })
    );
  }
}
