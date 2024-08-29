import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface ToasterState {
  isOpened: boolean;
  message: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toasterState$$: BehaviorSubject<ToasterState> =
    new BehaviorSubject<ToasterState>({
      isOpened: false,
      message: null,
    });

  public toasterState$: Observable<ToasterState> =
    this.toasterState$$.asObservable();

  set toasterState(value: ToasterState) {
    this.toasterState$$.next(value);
  }

  get toasterState(): Observable<ToasterState> {
    return this.toasterState$;
  }

  resetToasterState() {
    this.toasterState = { isOpened: false, message: null };
  }
}
