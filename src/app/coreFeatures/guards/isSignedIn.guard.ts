import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable, map } from 'rxjs';
import { AuthStoreService } from '../services/auth/auth-store.service';

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanActivate {
  constructor(
    private authStoreService: AuthStoreService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot // eslint-disable-line @typescript-eslint/no-unused-vars
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authStoreService.isAuthorized$.pipe(
      map((isAuthorized) => {
        if (isAuthorized) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}
