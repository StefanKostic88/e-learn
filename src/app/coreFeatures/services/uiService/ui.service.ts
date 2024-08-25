import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { SessionStorageService } from '../session-storage/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private navigationIsOpened$$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  public navigationIsOpened$: Observable<boolean> =
    this.navigationIsOpened$$.asObservable();

  private darkMode$$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public darkMode$: Observable<boolean> = this.darkMode$$.asObservable();

  private loadingSpiner$$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  public loadingSpiner$: Observable<boolean> =
    this.loadingSpiner$$.asObservable();

  private errorMessage$$: BehaviorSubject<null | string> = new BehaviorSubject<
    string | null
  >(null);

  public errorMessage$: Observable<string | null> =
    this.errorMessage$$.asObservable();

  private actionSuccess$$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  public actionSuccess$ = this.actionSuccess$$.asObservable();

  constructor(private sessionStorageService: SessionStorageService) {}

  get isNavigationIsOpened(): Observable<boolean> {
    return this.navigationIsOpened$;
  }

  set isNavigationIsOpened(val: boolean) {
    this.navigationIsOpened$$.next(val);
  }

  get darkMode(): Observable<boolean> {
    return this.darkMode$;
  }
  set darkMode(value: boolean) {
    this.darkMode$$.next(value);
  }

  set loadingSpiner(val: boolean) {
    this.loadingSpiner$$.next(val);
  }
  get loadingSpiner(): Observable<boolean> {
    return this.loadingSpiner$;
  }

  set errorMessage(value: null | string) {
    this.errorMessage$$.next(value);
  }
  get errorMessage(): Observable<null | string> {
    return this.errorMessage$;
  }

  set actionSuccess(val: boolean) {
    this.actionSuccess$$.next(val);
  }
  get actionSuccess(): Observable<boolean> {
    return this.actionSuccess$;
  }

  public toggleNavigationMenu(): void {
    const currentValue = this.navigationIsOpened$$.getValue();

    this.navigationIsOpened$$.next(!currentValue);
  }
  public closeNavigation(): void {
    this.navigationIsOpened$$.next(false);
  }

  public darkModeToggler() {
    const curDarkValue = this.darkMode$$.getValue();
    this.darkMode = !curDarkValue;
  }

  public applyDarkMode() {
    const darkModeClass = 'dark';
    document.querySelector('body')?.classList.toggle(darkModeClass);

    if (this.darkMode$$.getValue()) {
      this.sessionStorageService.setMode(darkModeClass);
    } else {
      this.sessionStorageService.delteMode();
    }
  }

  public getCurrentMode() {
    return of(this.sessionStorageService.getMode()).pipe(
      tap((mode) => {
        if (mode === 'dark') {
          document.querySelector('body')?.classList.add(mode);
          this.darkMode = true;
        }
      })
    );
  }

  public resetErrorAndSucessState() {
    this.actionSuccess = false;
    this.errorMessage = null;
  }

  public resetErrorMessage() {
    this.errorMessage = null;
  }
}
