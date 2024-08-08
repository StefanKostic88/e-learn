import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    currentState: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    nextState: RouterStateSnapshot // eslint-disable-line @typescript-eslint/no-unused-vars
  ): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
