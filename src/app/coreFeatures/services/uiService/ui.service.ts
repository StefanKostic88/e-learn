import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private navigationIsOpened$$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  public navigationIsOpened$: Observable<boolean> =
    this.navigationIsOpened$$.asObservable();

  get isNavigationIsOpened(): Observable<boolean> {
    return this.navigationIsOpened$;
  }

  set isNavigationIsOpened(val: boolean) {
    this.navigationIsOpened$$.next(val);
  }

  public toggleNavigationMenu(): void {
    const currentValue = this.navigationIsOpened$$.getValue();

    this.navigationIsOpened$$.next(!currentValue);
  }
  public closeNavigation(): void {
    this.navigationIsOpened$$.next(false);
  }
}
