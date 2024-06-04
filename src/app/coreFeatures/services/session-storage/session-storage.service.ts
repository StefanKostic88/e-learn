import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../../../providers/windowProvider';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  TOKEN = 'SESSION_TOKEN';
  constructor(@Inject(WINDOW) private window: Window) {}

  public setToken(token: string): void {
    this.window.sessionStorage.setItem(this.TOKEN, token);
  }
  public getToken(): string | null {
    return this.window.sessionStorage.getItem(this.TOKEN ?? '');
  }

  public deleteToken(): void {
    this.window.sessionStorage.removeItem(this.TOKEN);
  }
}
