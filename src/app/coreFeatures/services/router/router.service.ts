import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  public toHomePage(): void {
    this.router.navigate(['/']);
  }
  public toMyAccount(): void {
    this.router.navigate(['/my-account']);
  }
}
