import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthStoreService } from '../services/auth/auth-store.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
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
          return true;
        }

        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
