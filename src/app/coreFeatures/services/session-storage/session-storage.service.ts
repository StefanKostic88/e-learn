import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../../../providers/windowProvider';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  TOKEN = 'SESSION_TOKEN';
  MODE = 'DARK_MODE';
  HEADER_DATA = 'HEADER_DATA';

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

  public setMode(mode: string): void {
    this.window.sessionStorage.setItem(this.MODE, mode);
  }
  public getMode() {
    return this.window.sessionStorage.getItem(this.MODE ?? '');
  }
  public delteMode() {
    this.window.sessionStorage.removeItem(this.MODE);
  }

  public setHeaderData(data: { email: string; username: string; img: string }) {
    this.window.sessionStorage.setItem(this.HEADER_DATA, JSON.stringify(data));
  }
  public getHeaderData() {
    return this.window.sessionStorage.getItem(this.HEADER_DATA ?? '');
  }
  public deleteHeaderData() {
    this.window.sessionStorage.removeItem(this.HEADER_DATA);
  }
}
